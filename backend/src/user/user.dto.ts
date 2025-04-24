import { IsString, IsArray, IsOptional, IsDate, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

// filepath: /workspaces/bk-jobmate-backend/backend/src/user/user.dto.ts

class ExpertiseDto {
    @ApiProperty({ description: 'The ID of the expertise' })
    @IsString()
    ExpertiseID: string;

    @ApiProperty({ description: 'The name of the expertise' })
    @IsString()
    Name: string;
}

class PeriodDto {
    @ApiProperty({ description: 'The start date of the period' })
    @IsDate()
    Start: Date;

    @ApiProperty({ description: 'The end date of the period' })
    @IsDate()
    End: Date;
}

export class SkillDto {
    @ApiProperty({ description: 'The expertise details', type: ExpertiseDto })
    @ValidateNested()
    @Type(() => ExpertiseDto)
    Expertise: ExpertiseDto;

    @ApiProperty({ description: 'The name of the skill' })
    @IsString()
    Name: string;

    @ApiProperty({ description: 'The description of the skill' })
    @IsString()
    Description: string;
}

export class ExperienceDto {
    @ApiProperty({ description: 'The ID of the user' })
    @IsString()
    UserID: string;

    @ApiProperty({ description: 'The period of the experience', type: PeriodDto })
    @ValidateNested()
    @Type(() => PeriodDto)
    Period: PeriodDto;

    @ApiProperty({ description: 'The job role during the experience', required: false })
    @IsOptional()
    @IsString()
    JobRole?: string;

    @ApiProperty({ description: 'The description of the experience', required: false })
    @IsOptional()
    @IsString()
    Description?: string;
}

export class UserDto {
    @ApiProperty({ description: 'The name of the user' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'The avatar of the user' })
    @IsString()
    avatar: string;

    @ApiProperty({ description: 'The unique ID of the user' })
    @IsString()
    userId: string;

    @ApiProperty({ description: 'The skill set of the user', type: [SkillDto], required: false })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SkillDto)
    skillSet?: SkillDto[];

    @ApiProperty({ description: 'The current job role of the user', required: false })
    @IsOptional()
    @IsString()
    jobRole?: string;
}