import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})

export class CourseModule {}