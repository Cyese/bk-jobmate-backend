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
import { UserService } from './user.service';
import { UserDto, SkillDto } from './user.dto';

@ApiTags('User')
@ApiBearerAuth('JWT-auth')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    type: UserDto,
    description: 'User data to create',
    examples: {
      validExample: {
        summary: 'Valid User Example',
        description: 'A valid example of a user object',
        value: {
          name: 'John Doe',
          avatar: 'https://example.com/avatars/johndoe.jpg',
          userId: '550e8400-e29b-41d4-a716-446655440000',
          jobRole: 'Senior Software Engineer',
          skillSet: [
            {
              Name: 'JavaScript',
              Description: 'Modern JavaScript including ES6+',
              Expertise: {
                ExpertiseID: '1',
                Name: 'Advanced',
              },
            },
            {
              Name: 'NestJS',
              Description: 'Backend development with NestJS',
              Expertise: {
                ExpertiseID: '2',
                Name: 'Intermediate',
              },
            },
          ],
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: UserDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async create(@Body() userDto: UserDto) {
    return this.userService.create(userDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Users have been successfully retrieved.',
  })
  async findAll() {
    return this.userService.findAll();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async update(@Param('id') id: string, @Body() userDto: Partial<UserDto>) {
    return this.userService.update(id, userDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  @Get(':id/skills')
  @ApiOperation({ summary: 'Get all skills for a user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'Skills have been successfully retrieved.',
    type: [SkillDto],
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getUserSkills(@Param('id') id: string) {
    return this.userService.getUserSkills(id);
  }

  @Post(':id/skills')
  @ApiOperation({ summary: 'Add a skill to a user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBody({ type: SkillDto })
  @ApiResponse({
    status: 201,
    description: 'The skill has been successfully added.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async addSkill(@Param('id') id: string, @Body() skillDto: SkillDto) {
    return this.userService.addSkill(id, skillDto);
  }

  @Delete(':id/skills/:skillName')
  @ApiOperation({ summary: 'Remove a skill from a user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiParam({ name: 'skillName', description: 'Skill name' })
  @ApiResponse({
    status: 200,
    description: 'The skill has been successfully removed.',
  })
  @ApiResponse({ status: 404, description: 'User or skill not found.' })
  async removeSkill(
    @Param('id') id: string,
    @Param('skillName') skillName: string,
  ) {
    return this.userService.removeSkill(id, skillName);
  }

  @Get('search/bySkill')
  @ApiOperation({ summary: 'Search users by skill' })
  @ApiQuery({ name: 'skill', description: 'Skill name to search for' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Users have been successfully retrieved.',
    type: [UserDto],
  })
  async searchBySkill(@Query('skill') skill: string) {
    return this.userService.searchBySkill(skill);
  }
}
