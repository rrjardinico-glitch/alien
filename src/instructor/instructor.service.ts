import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RowDataPacket, OkPacket } from 'mysql2';

@Injectable()
export class InstructorService {
  constructor(private db: DatabaseService) {}

  private pool = () => this.db.getPool();

  async createInstructor(users_id: number, First_Name: string, Last_Name: string, Dept_name: string) {
    const [result] = await this.pool().execute<OkPacket>(
      'INSERT INTO instructor (users_id, First_Name, Last_Name, Dept_name) VALUES (?, ?, ?, ?)',
      [users_id, First_Name, Last_Name, Dept_name],
    );
    return { id: result.insertId, users_id, First_Name, Last_Name, Dept_name };
  }

  async findByName(First_Name: string) {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM instructor WHERE First_Name = ?',
      [First_Name],
    );
    return rows[0];
  }

  async findById(id: number) {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM instructor WHERE Instructor_ID = ?',
      [id],
    );
    return rows[0];
  }

  async getAll() {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM instructor',
    );
    return rows;
  }

  async updateInstructor(id: number, partial: { users_id?: number; First_Name?: string; Last_Name?: string; Dept_name?: string }) {
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

    if (partial.Dept_name !== undefined) {
      fields.push('Dept_name = ?');
      values.push(partial.Dept_name);
    }

    if (fields.length === 0) return await this.findById(id);

    values.push(id);

    const sql = `UPDATE instructor SET ${fields.join(', ')} WHERE Instructor_ID = ?`;
    await this.pool().execute(sql, values);

    return this.findById(id);
  }

  async deleteInstructor(id: number) {
    const [result] = await this.pool().execute<OkPacket>(
      'DELETE FROM instructor WHERE Instructor_ID = ?',
      [id],
    );
    return result.affectedRows > 0;
  }
}
