import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { InstructorController } from './instructor.controller';
import { DatabaseModule } from '../database/database.module';
import { InstructorService } from './instructor.service';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [InstructorController],
  providers: [InstructorService],
  exports: [InstructorService],
})
export class InstructorModule {}
