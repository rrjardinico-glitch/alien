import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RowDataPacket, OkPacket } from 'mysql2';

@Injectable()
export class StudentService {
  constructor(private db: DatabaseService) {}

  private pool = () => this.db.getPool();

  async createStudent(users_id: number, First_Name: string, Last_Name: string, Section: string) {
    const [result] = await this.pool().execute<OkPacket>(
      'INSERT INTO student (users_id, First_Name, Last_Name, Section) VALUES (?, ?, ?, ?)',
      [users_id, First_Name, Last_Name, Section],
    );
    return { id: result.insertId, users_id, First_Name, Last_Name, Section };
  }

  async findByName(First_Name: string) {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM student WHERE First_Name = ?',
      [First_Name],
    );
    return rows[0];
  }

  async findById(id: number) {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM student WHERE student_ID = ?',
      [id],
    );
    return rows[0];
  }

  async getAll() {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM student',
    );
    return rows;
  }

  async updateStudent(id: number, partial: { users_id?: number; First_Name?: string; Last_Name?: string; Section?: string }) {
    const fields: string[] = [];
    const values: any[] = [];

    if (partial.users_id !== undefined) {
      fields.push('users_id = ?');
      values.push(partial.users_id);
    }

    if (partial.First_Name !== undefined) {
      fields.push('First_Name = ?');
      values.push(partial.First_Name);
    }

    if (partial.Last_Name !== undefined) {
      fields.push('Last_Name = ?');
      values.push(partial.Last_Name);
    }

    if (partial.Section !== undefined) {
      fields.push('Section = ?');
      values.push(partial.Section);
    }

    if (fields.length === 0) return await this.findById(id);

    values.push(id);

    const sql = `UPDATE student SET ${fields.join(', ')} WHERE student_ID = ?`;
    await this.pool().execute(sql, values);

    return this.findById(id);
  }

  async deleteStudent(id: number) {
    const [result] = await this.pool().execute<OkPacket>(
      'DELETE FROM student WHERE student_ID = ?',
      [id],
    );
    return result.affectedRows > 0;
  }
}
