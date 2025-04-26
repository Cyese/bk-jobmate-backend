import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Experience } from '../user/user.schema';
import { ExperienceDto } from '../user/user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectModel(Experience.name) private readonly experienceModel: Model<Experience>,
    private readonly userService: UserService,
  ) {}

  // Create a new experience
  async create(experienceDto: ExperienceDto): Promise<Experience> {
    // Verify that the user exists
    try {
      await this.userService.findOne(experienceDto.UserID);
    } catch (error) {
      throw new BadRequestException(`User with ID ${experienceDto.UserID} not found`);
    }

    // Create the experience
    const newExperience = new this.experienceModel({
      UserID: experienceDto.UserID,
      Period: experienceDto.Period,
      JobRole: experienceDto.JobRole,
      Description: experienceDto.Description,
    });

    return newExperience.save();
  }

  // Get a single experience by ID
  async findOne(id: string): Promise<Experience> {
    const experience = await this.experienceModel.findById(id).exec();
    if (!experience) {
      throw new NotFoundException(`Experience with ID ${id} not found`);
    }
    return experience;
  }

  // Get all experiences
  async findAll(): Promise<Experience[]> {
    return this.experienceModel.find().exec();
  }

  // Get experiences by user ID
  async findByUserId(userId: string): Promise<Experience[]> {
    // Verify that the user exists
    try {
      await this.userService.findOne(userId);
    } catch (error) {
      throw new BadRequestException(`User with ID ${userId} not found`);
    }

    return this.experienceModel.find({ UserID: userId }).exec();
  }

  // Update an experience by ID
  async update(
    id: string,
    experienceDto: Partial<ExperienceDto>,
  ): Promise<Experience> {
    // If UserID is provided, verify that the user exists
    if (experienceDto.UserID) {
      try {
        await this.userService.findOne(experienceDto.UserID);
      } catch (error) {
        throw new BadRequestException(`User with ID ${experienceDto.UserID} not found`);
      }
    }

    const updatedExperience = await this.experienceModel
      .findByIdAndUpdate(id, experienceDto, { new: true })
      .exec();

    if (!updatedExperience) {
      throw new NotFoundException(`Experience with ID ${id} not found`);
    }

    return updatedExperience;
  }

  // Delete an experience by ID
  async delete(id: string): Promise<void> {
    const result = await this.experienceModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Experience with ID ${id} not found`);
    }
  }
}
