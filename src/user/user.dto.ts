import {
  IsString,
  IsArray,
  IsOptional,
  IsDate,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

// filepath: /workspaces/bk-jobmate-backend/backend/src/user/user.dto.ts

class ExpertiseDto {
  @ApiProperty({
    description: 'The ID of the expertise',
    example: '1',
  })
  @IsString()
  ExpertiseID: string;

  @ApiProperty({
    description: 'The name of the expertise',
    example: 'Advanced',
  })
  @IsString()
  Name: string;
}

class PeriodDto {
  @ApiProperty({
    description: 'The start date of the period',
    example: '2023-01-01T00:00:00.000Z',
  })
  @IsDate()
  @Type(() => Date)
  Start: Date;

  @ApiProperty({
    description: 'The end date of the period',
    example: '2023-12-31T23:59:59.999Z',
  })
  @IsDate()
  @Type(() => Date)
  End: Date;
}

export class SkillDto {
  @ApiProperty({
    description: 'The expertise details',
    type: ExpertiseDto,
    example: {
      ExpertiseID: '1',
      Name: 'Advanced',
    },
  })
  @ValidateNested()
  @Type(() => ExpertiseDto)
  Expertise: ExpertiseDto;

  @ApiProperty({
    description: 'The name of the skill',
    example: 'JavaScript',
  })
  @IsString()
  Name: string;

  @ApiProperty({
    description: 'The description of the skill',
    example: 'Modern JavaScript including ES6+',
  })
  @IsString()
  Description: string;
}

export class ExperienceDto {
  @ApiProperty({
    description: 'The ID of the user (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsString()
  UserID: string;

  @ApiProperty({
    description: 'The period of the experience',
    type: PeriodDto,
    example: {
      Start: '2023-01-01T00:00:00.000Z',
      End: '2023-12-31T23:59:59.999Z',
    },
  })
  @ValidateNested()
  @Type(() => PeriodDto)
  Period: PeriodDto;

  @ApiProperty({
    description: 'The job role during the experience',
    required: false,
    example: 'Senior Software Engineer at Google',
  })
  @IsOptional()
  @IsString()
  JobRole?: string;

  @ApiProperty({
    description: 'The description of the experience',
    required: false,
    example:
      'Led a team of 5 developers to build a scalable microservices architecture using NestJS, MongoDB, and Docker.',
  })
  @IsOptional()
  @IsString()
  Description?: string;
}

export class UserDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The avatar of the user',
    example: 'https://example.com/avatars/johndoe.jpg',
  })
  @IsString()
  avatar: string;

  @ApiProperty({
    description: 'The unique ID of the user (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'The skill set of the user',
    type: [SkillDto],
    required: false,
    example: [
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
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SkillDto)
  skillSet?: SkillDto[];

  @ApiProperty({
    description: 'The current job role of the user',
    required: false,
    example: 'Senior Software Engineer',
  })
  @IsOptional()
  @IsString()
  jobRole?: string;
}
