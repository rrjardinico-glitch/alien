import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RowDataPacket, OkPacket } from 'mysql2';

@Injectable()
export class EnrollmentService {
  constructor(private db: DatabaseService) {}

  private pool = () => this.db.getPool();

  async createEnrollment(student_ID: string, Course_id: string, Semester: string, GWA: number) {
    const [result] = await this.pool().execute<OkPacket>(
      'INSERT INTO enrollment (student_ID, Course_id, Semester, GWA) VALUES (?, ?, ?, ?)',
      [student_ID, Course_id, Semester, GWA],
    );
    return { id: result.insertId, student_ID, Course_id, Semester, GWA };
  }

  async findById(id: number) {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM enrollment WHERE Enrollment_ID = ?',
      [id],
    );
    return rows[0];
  }

  async getAll() {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM enrollment',
    );
    return rows;
  }

  async updateEnrollment(id: number, partial: { student_ID?: string; Course_id?: string; Semester?: string; GWA?: number }) {
    const fields: string[] = [];
    const values: any[] = [];

    if (partial.student_ID !== undefined) {
      fields.push('student_ID = ?');
      values.push(partial.student_ID);
    }

    if (partial.Course_id !== undefined) {
      fields.push('Course_id = ?');
      values.push(partial.Course_id);
    }

    if (partial.Semester !== undefined) {
      fields.push('Semester = ?');
      values.push(partial.Semester);
    }

    if (partial.GWA !== undefined) {
      fields.push('GWA = ?');
      values.push(partial.GWA);
    }

    if (fields.length === 0) return await this.findById(id);

    values.push(id);

    const sql = `UPDATE enrollment SET ${fields.join(', ')} WHERE Enrollment_ID = ?`;
    await this.pool().execute(sql, values);

    return this.findById(id);
  }

  async deleteEnrollment(id: number) {
    const [result] = await this.pool().execute<OkPacket>(
      'DELETE FROM enrollment WHERE Enrollment_ID = ?',
      [id],
    );
    return result.affectedRows > 0;
  }
}
