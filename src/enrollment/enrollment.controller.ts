import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('enrollment')
export class EnrollmentController {
  constructor(private enrollmentService: EnrollmentService) {}

  // Get all enrollments (protected)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.enrollmentService.getAll();
  }

  // Get single enrollment by id (protected)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.enrollmentService.findById(+id);
  }

  // Create enrollment (open - for demo)
  @Post()
  async create(@Body() body: { student_ID: string, Course_id: string, Semester: string, Total_grade?: number }) {
    return this.enrollmentService.createEnrollment(body.student_ID, body.Course_id, body.Semester, body.Total_grade);
  }

  // Update enrollment (protected)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.enrollmentService.updateEnrollment(+id, body);
  }

  // Delete enrollment (protected)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.enrollmentService.deleteEnrollment(+id);
  }
}