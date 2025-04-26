import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type QuestionDocument = HydratedDocument<Question>;
export type LessonDocument = HydratedDocument<Lesson>;
export type CourseDocument = HydratedDocument<Course>;

@Schema()
export class Question {
  @Prop({ required: true, unique: true })
  QuestionID: string;

  @Prop({ required: true })
  Question: string;

  @Prop({ required: true, type: [String], validate: [(arr: string[]) => arr.length === 4, 'Options must have exactly 4 items'] })
  Option: string[];

  @Prop({ required: true, min: 1, max: 4 })
  Answer: number;

  @Prop({ required: false })
  Solution: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);

@Schema()
export class Lesson {
  @Prop({ required: true })
  LessonID: string;

  @Prop({ type: [String], ref: 'Question' })
  Questions: string[];

  @Prop({ required: true })
  Name: string;

  @Prop({ type: [String] })
  Keyword: string[];
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);

@Schema()
export class Course {
  @Prop({ required: true })
  CourseID: string;

  @Prop({ required: true })
  Name: string;

  @Prop({ required: true })
  Description: string;

  @Prop({ type: [String], ref: 'Lesson' })
  Lessons: string[];

  @Prop({ required: false })
  Category: string;

  @Prop({ required: false, default: 0 })
  EnrollmentCount: number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
