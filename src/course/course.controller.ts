import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CourseService } from './course.service';
import { CourseDto, LessonDto, QuestionDto } from './course.dto';

@ApiTags('Course')
@ApiBearerAuth('JWT-auth')
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  // COURSE ENDPOINTS
  @Post()
  @ApiOperation({ summary: 'Create a new course' })
  @ApiBody({ type: CourseDto })
  @ApiResponse({
    status: 201,
    description: 'The course has been successfully created.',
    type: CourseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async createCourse(@Body() courseDto: CourseDto) {
    return this.courseService.createCourse(courseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all courses' })
  @ApiResponse({
    status: 200,
    description: 'List of all courses.',
    type: [CourseDto],
  })
  async findAllCourses() {
    return this.courseService.findAllCourses();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a course by ID' })
  @ApiParam({ name: 'id', description: 'Course ID' })
  @ApiResponse({
    status: 200,
    description: 'The course has been found.',
    type: CourseDto,
  })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  async findCourseById(@Param('id') id: string) {
    return this.courseService.findCourseById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a course' })
  @ApiParam({ name: 'id', description: 'Course ID' })
  @ApiBody({ type: CourseDto })
  @ApiResponse({
    status: 200,
    description: 'The course has been successfully updated.',
    type: CourseDto,
  })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  async updateCourse(
    @Param('id') id: string,
    @Body() courseDto: Partial<CourseDto>,
  ) {
    return this.courseService.updateCourse(id, courseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a course' })
  @ApiParam({ name: 'id', description: 'Course ID' })
  @ApiResponse({
    status: 200,
    description: 'The course has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  async deleteCourse(@Param('id') id: string) {
    return this.courseService.deleteCourse(id);
  }

  // LESSON ENDPOINTS
  @Post('lessons')
  @ApiOperation({ summary: 'Create a new lesson' })
  @ApiBody({ type: LessonDto })
  @ApiResponse({
    status: 201,
    description: 'The lesson has been successfully created.',
    type: LessonDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async createLesson(@Body() lessonDto: LessonDto) {
    return this.courseService.createLesson(lessonDto);
  }

  @Get('lessons')
  @ApiOperation({ summary: 'Get all lessons' })
  @ApiResponse({
    status: 200,
    description: 'List of all lessons.',
    type: [LessonDto],
  })
  async findAllLessons() {
    return this.courseService.findAllLessons();
  }

  @Get('lessons/:id')
  @ApiOperation({ summary: 'Get a lesson by ID' })
  @ApiParam({ name: 'id', description: 'Lesson ID' })
  @ApiResponse({
    status: 200,
    description: 'The lesson has been found.',
    type: LessonDto,
  })
  @ApiResponse({ status: 404, description: 'Lesson not found.' })
  async findLessonById(@Param('id') id: string) {
    return this.courseService.findLessonById(id);
  }

  @Put('lessons/:id')
  @ApiOperation({ summary: 'Update a lesson' })
  @ApiParam({ name: 'id', description: 'Lesson ID' })
  @ApiBody({ type: LessonDto })
  @ApiResponse({
    status: 200,
    description: 'The lesson has been successfully updated.',
    type: LessonDto,
  })
  @ApiResponse({ status: 404, description: 'Lesson not found.' })
  async updateLesson(
    @Param('id') id: string,
    @Body() lessonDto: Partial<LessonDto>,
  ) {
    return this.courseService.updateLesson(id, lessonDto);
  }

  @Delete('lessons/:id')
  @ApiOperation({ summary: 'Delete a lesson' })
  @ApiParam({ name: 'id', description: 'Lesson ID' })
  @ApiResponse({
    status: 200,
    description: 'The lesson has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Lesson not found.' })
  async deleteLesson(@Param('id') id: string) {
    return this.courseService.deleteLesson(id);
  }

  // QUESTION ENDPOINTS
  @Post('questions')
  @ApiOperation({ summary: 'Create a new question' })
  @ApiBody({ type: QuestionDto })
  @ApiResponse({
    status: 201,
    description: 'The question has been successfully created.',
    type: QuestionDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async createQuestion(@Body() questionDto: QuestionDto) {
    return this.courseService.createQuestion(questionDto);
  }

  @Get('questions')
  @ApiOperation({ summary: 'Get all questions' })
  @ApiResponse({
    status: 200,
    description: 'List of all questions.',
    type: [QuestionDto],
  })
  async findAllQuestions() {
    return this.courseService.findAllQuestions();
  }

  @Get('questions/:id')
  @ApiOperation({ summary: 'Get a question by ID' })
  @ApiParam({ name: 'id', description: 'Question ID' })
  @ApiResponse({
    status: 200,
    description: 'The question has been found.',
    type: QuestionDto,
  })
  @ApiResponse({ status: 404, description: 'Question not found.' })
  async findQuestionById(@Param('id') id: string) {
    return this.courseService.findQuestionById(id);
  }

  @Put('questions/:id')
  @ApiOperation({ summary: 'Update a question' })
  @ApiParam({ name: 'id', description: 'Question ID' })
  @ApiBody({ type: QuestionDto })
  @ApiResponse({
    status: 200,
    description: 'The question has been successfully updated.',
    type: QuestionDto,
  })
  @ApiResponse({ status: 404, description: 'Question not found.' })
  async updateQuestion(
    @Param('id') id: string,
    @Body() questionDto: Partial<QuestionDto>,
  ) {
    return this.courseService.updateQuestion(id, questionDto);
  }

  @Delete('questions/:id')
  @ApiOperation({ summary: 'Delete a question' })
  @ApiParam({ name: 'id', description: 'Question ID' })
  @ApiResponse({
    status: 200,
    description: 'The question has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Question not found.' })
  async deleteQuestion(@Param('id') id: string) {
    return this.courseService.deleteQuestion(id);
  }

  // RELATIONSHIP ENDPOINTS
  @Post(':courseId/lessons/:lessonId')
  @ApiOperation({ summary: 'Add a lesson to a course' })
  @ApiParam({ name: 'courseId', description: 'Course ID' })
  @ApiParam({ name: 'lessonId', description: 'Lesson ID' })
  @ApiResponse({
    status: 200,
    description: 'The lesson has been successfully added to the course.',
    type: CourseDto,
  })
  @ApiResponse({ status: 404, description: 'Course or lesson not found.' })
  @ApiResponse({ status: 400, description: 'Lesson already in course.' })
  async addLessonToCourse(
    @Param('courseId') courseId: string,
    @Param('lessonId') lessonId: string,
  ) {
    return this.courseService.addLessonToCourse(courseId, lessonId);
  }

  @Delete(':courseId/lessons/:lessonId')
  @ApiOperation({ summary: 'Remove a lesson from a course' })
  @ApiParam({ name: 'courseId', description: 'Course ID' })
  @ApiParam({ name: 'lessonId', description: 'Lesson ID' })
  @ApiResponse({
    status: 200,
    description: 'The lesson has been successfully removed from the course.',
    type: CourseDto,
  })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  @ApiResponse({ status: 400, description: 'Lesson not in course.' })
  async removeLessonFromCourse(
    @Param('courseId') courseId: string,
    @Param('lessonId') lessonId: string,
  ) {
    return this.courseService.removeLessonFromCourse(courseId, lessonId);
  }

  @Post('lessons/:lessonId/questions/:questionId')
  @ApiOperation({ summary: 'Add a question to a lesson' })
  @ApiParam({ name: 'lessonId', description: 'Lesson ID' })
  @ApiParam({ name: 'questionId', description: 'Question ID' })
  @ApiResponse({
    status: 200,
    description: 'The question has been successfully added to the lesson.',
    type: LessonDto,
  })
  @ApiResponse({ status: 404, description: 'Lesson or question not found.' })
  @ApiResponse({ status: 400, description: 'Question already in lesson.' })
  async addQuestionToLesson(
    @Param('lessonId') lessonId: string,
    @Param('questionId') questionId: string,
  ) {
    return this.courseService.addQuestionToLesson(lessonId, questionId);
  }

  @Delete('lessons/:lessonId/questions/:questionId')
  @ApiOperation({ summary: 'Remove a question from a lesson' })
  @ApiParam({ name: 'lessonId', description: 'Lesson ID' })
  @ApiParam({ name: 'questionId', description: 'Question ID' })
  @ApiResponse({
    status: 200,
    description: 'The question has been successfully removed from the lesson.',
    type: LessonDto,
  })
  @ApiResponse({ status: 404, description: 'Lesson not found.' })
  @ApiResponse({ status: 400, description: 'Question not in lesson.' })
  async removeQuestionFromLesson(
    @Param('lessonId') lessonId: string,
    @Param('questionId') questionId: string,
  ) {
    return this.courseService.removeQuestionFromLesson(lessonId, questionId);
  }
}
