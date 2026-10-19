import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CourseService } from './course.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  // Get all courses (protected)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.courseService.getAll();
  }

  // Get single course  by id (protected)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.courseService.findById(+id);
  }

  // Create course (open - for demo)
  @Post()
  async create(@Body() body: { Instructor_ID: string; Course_name: string }) {
    return this.courseService.createCourse(body.Instructor_ID, body.Course_name);
  }

  // Update course (protected)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.courseService.updateCourse(+id, body);
  }

  // Delete course (protected)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.courseService.deleteCourse(+id);
  }
}