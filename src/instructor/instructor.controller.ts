import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('instructor')
export class InstructorController {
  constructor(private instructorService: InstructorService) {}

  // Get all instructors (protected)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.instructorService.getAll();
  }

  // Get single instructor by id (protected)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.instructorService.findById(+id);
  }

  // Create instructor (open - for demo)
  @Post()
  async create(@Body() body: { users_id: number, First_Name: string, Last_Name: string, Dept_name: string }) {
    return this.instructorService.createInstructor(body.users_id, body.First_Name, body.Last_Name, body.Dept_name);
  }

  // Update instructor (protected)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.instructorService.updateInstructor(+id, body);
  }

  // Delete instructor (protected)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.instructorService.deleteInstructor(+id);
  }
}
