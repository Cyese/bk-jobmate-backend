import {
  IsString,
  IsArray,
  IsOptional,
  IsNumber,
  IsInt,
  Min,
  Max,
  ArrayMinSize,
  ArrayMaxSize,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class QuestionDto {
  @ApiProperty({
    description: 'The unique ID of the question (UUID)',
    example: 'q550e840-e29b-41d4-a716-446655440001',
  })
  @IsString()
  QuestionID: string;

  @ApiProperty({
    description: 'The question text',
    example: 'What is a closure in JavaScript?',
  })
  @IsString()
  Question: string;

  @ApiProperty({
    description: 'The answer options (must be exactly 4)',
    type: [String],
    example: [
      'A function that has access to variables from its outer scope',
      'A way to close a browser window using JavaScript',
      'A method to terminate a JavaScript program',
      'A design pattern for creating private variables',
    ],
  })
  @IsArray()
  @ArrayMinSize(4)
  @ArrayMaxSize(4)
  @IsString({ each: true })
  Option: string[];

  @ApiProperty({
    description: 'The correct answer (1-4)',
    minimum: 1,
    maximum: 4,
    example: 1,
  })
  @IsInt()
  @Min(1)
  @Max(4)
  Answer: number;

  @ApiProperty({
    description: 'The solution explanation',
    required: false,
    example:
      'A closure is a function that has access to variables from its outer (enclosing) scope, even after the outer function has returned.',
  })
  @IsOptional()
  @IsString()
  Solution?: string;
}

export class LessonDto {
  @ApiProperty({
    description: 'The unique ID of the lesson (UUID)',
    example: 'l550e840-e29b-41d4-a716-446655440001',
  })
  @IsString()
  LessonID: string;

  @ApiProperty({
    description: 'The question IDs in this lesson (UUIDs)',
    type: [String],
    required: false,
    example: [
      'q550e840-e29b-41d4-a716-446655440001',
      'q550e840-e29b-41d4-a716-446655440002',
      'q550e840-e29b-41d4-a716-446655440003',
    ],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  Questions?: string[];

  @ApiProperty({
    description: 'The name of the lesson',
    example: 'JavaScript Closures and Scope',
  })
  @IsString()
  Name: string;

  @ApiProperty({
    description: 'Keywords for the lesson',
    type: [String],
    required: false,
    example: ['closures', 'scope', 'lexical environment', 'execution context'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  Keyword?: string[];
}

export class CourseDto {
  @ApiProperty({
    description: 'The unique ID of the course (UUID)',
    example: 'c550e840-e29b-41d4-a716-446655440000',
  })
  @IsString()
  CourseID: string;

  @ApiProperty({
    description: 'The name of the course',
    example: 'Advanced JavaScript Programming',
  })
  @IsString()
  Name: string;

  @ApiProperty({
    description: 'The description of the course',
    example:
      'Learn advanced JavaScript concepts including closures, prototypes, async/await, and modern ES6+ features.',
  })
  @IsString()
  Description: string;

  @ApiProperty({
    description: 'The lesson IDs in this course (UUIDs)',
    type: [String],
    required: false,
    example: [
      'l550e840-e29b-41d4-a716-446655440001',
      'l550e840-e29b-41d4-a716-446655440002',
      'l550e840-e29b-41d4-a716-446655440003',
    ],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  Lessons?: string[];

  @ApiProperty({
    description: 'The category of the course',
    required: false,
    example: 'Programming',
  })
  @IsOptional()
  @IsString()
  Category?: string;

  @ApiProperty({
    description: 'The number of enrollments',
    required: false,
    default: 0,
    example: 1250,
  })
  @IsOptional()
  @IsNumber()
  EnrollmentCount?: number;
}
