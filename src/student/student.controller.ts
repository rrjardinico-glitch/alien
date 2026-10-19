import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { StudentService } from './student.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  // Get all students (protected)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.studentService.getAll();
  }

  // Get single brand by id (protected)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.studentService.findById(+id);
  }

  // Create brand (open - for demo)
  @Post()
  async create(@Body() body: { users_id: number, First_Name: string, Last_Name: string, Section: string }) {
    return this.studentService.createStudent(body.users_id, body.First_Name, body.Last_Name, body.Section);
  }

  // Update brand (protected)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.studentService.updateStudent(+id, body);
  }

  // Delete brand (protected)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.studentService.deleteStudent(+id);
  }
}
