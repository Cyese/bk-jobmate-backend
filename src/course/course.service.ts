import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, Lesson, Question } from './course.schema';
import { CourseDto, LessonDto, QuestionDto } from './course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private readonly courseModel: Model<Course>,
    @InjectModel(Lesson.name) private readonly lessonModel: Model<Lesson>,
    @InjectModel(Question.name) private readonly questionModel: Model<Question>,
  ) {}

  // COURSE METHODS
  async createCourse(courseDto: CourseDto): Promise<Course> {
    const newCourse = new this.courseModel(courseDto);
    return newCourse.save();
  }

  async findAllCourses(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  async findCourseById(id: string): Promise<Course> {
    const course = await this.courseModel.findOne({ CourseID: id }).exec();
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course;
  }

  async updateCourse(
    id: string,
    courseDto: Partial<CourseDto>,
  ): Promise<Course> {
    const updatedCourse = await this.courseModel
      .findOneAndUpdate({ CourseID: id }, courseDto, { new: true })
      .exec();

    if (!updatedCourse) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    return updatedCourse;
  }

  async deleteCourse(id: string): Promise<void> {
    const result = await this.courseModel
      .findOneAndDelete({ CourseID: id })
      .exec();

    if (!result) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
  }

  // LESSON METHODS
  async createLesson(lessonDto: LessonDto): Promise<Lesson> {
    const newLesson = new this.lessonModel(lessonDto);
    return newLesson.save();
  }

  async findAllLessons(): Promise<Lesson[]> {
    return this.lessonModel.find().exec();
  }

  async findLessonById(id: string): Promise<Lesson> {
    const lesson = await this.lessonModel.findOne({ LessonID: id }).exec();
    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }
    return lesson;
  }

  async updateLesson(
    id: string,
    lessonDto: Partial<LessonDto>,
  ): Promise<Lesson> {
    const updatedLesson = await this.lessonModel
      .findOneAndUpdate({ LessonID: id }, lessonDto, { new: true })
      .exec();

    if (!updatedLesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }

    return updatedLesson;
  }

  async deleteLesson(id: string): Promise<void> {
    const result = await this.lessonModel
      .findOneAndDelete({ LessonID: id })
      .exec();

    if (!result) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }
  }

  // QUESTION METHODS
  async createQuestion(questionDto: QuestionDto): Promise<Question> {
    const newQuestion = new this.questionModel(questionDto);
    return newQuestion.save();
  }

  async findAllQuestions(): Promise<Question[]> {
    return this.questionModel.find().exec();
  }

  async findQuestionById(id: string): Promise<Question> {
    const question = await this.questionModel
      .findOne({ QuestionID: id })
      .exec();
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return question;
  }

  async updateQuestion(
    id: string,
    questionDto: Partial<QuestionDto>,
  ): Promise<Question> {
    const updatedQuestion = await this.questionModel
      .findOneAndUpdate({ QuestionID: id }, questionDto, { new: true })
      .exec();

    if (!updatedQuestion) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    return updatedQuestion;
  }

  async deleteQuestion(id: string): Promise<void> {
    const result = await this.questionModel
      .findOneAndDelete({ QuestionID: id })
      .exec();

    if (!result) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
  }

  // RELATIONSHIP METHODS
  async addLessonToCourse(courseId: string, lessonId: string): Promise<Course> {
    const course = await this.findCourseById(courseId);
    const lesson = await this.findLessonById(lessonId);

    if (!course.Lessons) {
      course.Lessons = [];
    }

    if (course.Lessons.includes(lessonId)) {
      throw new BadRequestException(
        `Lesson with ID ${lessonId} is already in the course`,
      );
    }

    course.Lessons.push(lessonId);
    const updatedCourse = await this.courseModel
      .findOneAndUpdate(
        { CourseID: courseId },
        { Lessons: course.Lessons },
        { new: true },
      )
      .exec();

    if (!updatedCourse) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    return updatedCourse;
  }

  async removeLessonFromCourse(
    courseId: string,
    lessonId: string,
  ): Promise<Course> {
    const course = await this.findCourseById(courseId);

    if (!course.Lessons || !course.Lessons.includes(lessonId)) {
      throw new BadRequestException(
        `Lesson with ID ${lessonId} is not in the course`,
      );
    }

    course.Lessons = course.Lessons.filter((id) => id !== lessonId);
    const updatedCourse = await this.courseModel
      .findOneAndUpdate(
        { CourseID: courseId },
        { Lessons: course.Lessons },
        { new: true },
      )
      .exec();

    if (!updatedCourse) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    return updatedCourse;
  }

  async addQuestionToLesson(
    lessonId: string,
    questionId: string,
  ): Promise<Lesson> {
    const lesson = await this.findLessonById(lessonId);
    const question = await this.findQuestionById(questionId);

    if (!lesson.Questions) {
      lesson.Questions = [];
    }

    if (lesson.Questions.includes(questionId)) {
      throw new BadRequestException(
        `Question with ID ${questionId} is already in the lesson`,
      );
    }

    lesson.Questions.push(questionId);
    const updatedLesson = await this.lessonModel
      .findOneAndUpdate(
        { LessonID: lessonId },
        { Questions: lesson.Questions },
        { new: true },
      )
      .exec();

    if (!updatedLesson) {
      throw new NotFoundException(`Lesson with ID ${lessonId} not found`);
    }

    return updatedLesson;
  }

  async removeQuestionFromLesson(
    lessonId: string,
    questionId: string,
  ): Promise<Lesson> {
    const lesson = await this.findLessonById(lessonId);

    if (!lesson.Questions || !lesson.Questions.includes(questionId)) {
      throw new BadRequestException(
        `Question with ID ${questionId} is not in the lesson`,
      );
    }

    lesson.Questions = lesson.Questions.filter((id) => id !== questionId);
    const updatedLesson = await this.lessonModel
      .findOneAndUpdate(
        { LessonID: lessonId },
        { Questions: lesson.Questions },
        { new: true },
      )
      .exec();

    if (!updatedLesson) {
      throw new NotFoundException(`Lesson with ID ${lessonId} not found`);
    }

    return updatedLesson;
  }
}
