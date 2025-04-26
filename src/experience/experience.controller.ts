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
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { ExperienceService } from './experience.service';
import { ExperienceDto } from '../user/user.dto';

@ApiTags('Experience')
@ApiBearerAuth('JWT-auth')
@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new experience' })
  @ApiBody({ type: ExperienceDto })
  @ApiResponse({
    status: 201,
    description: 'The experience has been successfully created.',
    type: ExperienceDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async create(@Body() experienceDto: ExperienceDto) {
    return this.experienceService.create(experienceDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an experience by ID' })
  @ApiParam({ name: 'id', description: 'Experience ID' })
  @ApiResponse({
    status: 200,
    description: 'The experience has been successfully retrieved.',
    type: ExperienceDto,
  })
  @ApiResponse({ status: 404, description: 'Experience not found.' })
  async findOne(@Param('id') id: string) {
    return this.experienceService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all experiences or filter by user ID' })
  @ApiQuery({ 
    name: 'userId', 
    description: 'User ID to filter experiences', 
    required: false 
  })
  @ApiResponse({
    status: 200,
    description: 'Experiences have been successfully retrieved.',
    type: [ExperienceDto],
  })
  async findAll(@Query('userId') userId?: string) {
    if (userId) {
      return this.experienceService.findByUserId(userId);
    }
    return this.experienceService.findAll();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an experience by ID' })
  @ApiParam({ name: 'id', description: 'Experience ID' })
  @ApiBody({ type: ExperienceDto })
  @ApiResponse({
    status: 200,
    description: 'The experience has been successfully updated.',
    type: ExperienceDto,
  })
  @ApiResponse({ status: 404, description: 'Experience not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async update(
    @Param('id') id: string,
    @Body() experienceDto: Partial<ExperienceDto>,
  ) {
    return this.experienceService.update(id, experienceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an experience by ID' })
  @ApiParam({ name: 'id', description: 'Experience ID' })
  @ApiResponse({
    status: 200,
    description: 'The experience has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Experience not found.' })
  async delete(@Param('id') id: string) {
    return this.experienceService.delete(id);
  }
}
