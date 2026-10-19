import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RowDataPacket, OkPacket } from 'mysql2';

@Injectable()
export class CourseService {
  constructor(private db: DatabaseService) {}

  private pool = () => this.db.getPool();

  async createCourse(Instructor_ID: string, Course_name: string) {
    const [result] = await this.pool().execute<OkPacket>(
      'INSERT INTO course (Instructor_ID, Course_name) VALUES (?, ?)',
      [Instructor_ID, Course_name],
    );
    return { id: result.insertId, Instructor_ID, Course_name };
  }

  async findByName(Course_name: string) {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM course WHERE Course_name = ?',
      [Course_name],
    );
    return rows[0];
  }

  async findById(id: number) {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM course WHERE Course_id = ?',
      [id],
    );
    return rows[0];
  }

  async getAll() {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM course',
    );
    return rows;
  }

  async updateCourse(id: number, partial: { Instructor_ID?: string; Course_name?: string }) {
    const fields: string[] = [];
    const values: any[] = [];

    if (partial.Instructor_ID !== undefined) {
      fields.push('Instructor_ID = ?');
      values.push(partial.Instructor_ID);
    }

    if (partial.Course_name !== undefined) {
      fields.push('Course_name = ?');
      values.push(partial.Course_name);
    }


    if (fields.length === 0) return await this.findById(id);

    values.push(id);

    const sql = `UPDATE course SET ${fields.join(', ')} WHERE Course_id = ?`;
    await this.pool().execute(sql, values);

    return this.findById(id);
  }

  async deleteCourse(id: number) {
    const [result] = await this.pool().execute<OkPacket>(
      'DELETE FROM course WHERE Course_id = ?',
      [id],
    );
    return result.affectedRows > 0;
  }
}
