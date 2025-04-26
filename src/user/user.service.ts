import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, Skill } from './user.schema';
import { UserDto, SkillDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  // Create a new user
  async create(userDto: UserDto): Promise<User> {
    try {
      // Check if user with this ID already exists
      const existingUser = await this.userModel
        .findOne({ UserID: userDto.userId })
        .exec();
      if (existingUser) {
        throw new BadRequestException(
          `User with ID ${userDto.userId} already exists`,
        );
      }

      // Map DTO fields to schema fields (camelCase to PascalCase)
      const userData = {
        Name: userDto.name,
        Avatar: userDto.avatar,
        UserID: userDto.userId,
        SkillSet: userDto.skillSet?.map((skill) => ({
          Name: skill.Name,
          Description: skill.Description,
          Expertise: {
            ExpertiseID: skill.Expertise.ExpertiseID,
            Name: skill.Expertise.Name,
          },
        })),
        JobRole: userDto.jobRole,
      };

      const newUser = new this.userModel(userData);
      return newUser.save();
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Failed to create user: ${error.message}`);
    }
  }

  // Get a single user by ID
  async findOne(userId: string): Promise<User> {
    try {
      const user = await this.userModel
        .findOne({ UserID: userId, deleted: { $ne: true } })
        .exec();
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to find user: ${error.message}`);
    }
  }

  // Get many users
  async findAll(): Promise<User[]> {
    try {
      return this.userModel.find({ deleted: { $ne: true } }).exec();
    } catch (error) {
      throw new BadRequestException(`Failed to find users: ${error.message}`);
    }
  }

  // Update a user by ID
  async update(userId: string, userDto: Partial<UserDto>): Promise<User> {
    try {
      // Map DTO fields to schema fields (camelCase to PascalCase)
      const updateData: any = {};

      if (userDto.name !== undefined) updateData.Name = userDto.name;
      if (userDto.avatar !== undefined) updateData.Avatar = userDto.avatar;
      if (userDto.userId !== undefined) {
        // Check if new userId already exists (if changing userId)
        if (userDto.userId !== userId) {
          const existingUser = await this.userModel
            .findOne({ UserID: userDto.userId })
            .exec();
          if (existingUser) {
            throw new BadRequestException(
              `User with ID ${userDto.userId} already exists`,
            );
          }
        }
        updateData.UserID = userDto.userId;
      }
      if (userDto.jobRole !== undefined) updateData.JobRole = userDto.jobRole;

      if (userDto.skillSet) {
        updateData.SkillSet = userDto.skillSet.map((skill) => ({
          Name: skill.Name,
          Description: skill.Description,
          Expertise: {
            ExpertiseID: skill.Expertise.ExpertiseID,
            Name: skill.Expertise.Name,
          },
        }));
      }

      const updatedUser = await this.userModel
        .findOneAndUpdate(
          { UserID: userId, deleted: { $ne: true } },
          updateData,
          { new: true },
        )
        .exec();

      if (!updatedUser) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
      return updatedUser;
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new BadRequestException(`Failed to update user: ${error.message}`);
    }
  }

  // Soft delete a user by ID
  async delete(userId: string): Promise<void> {
    try {
      const result = await this.userModel
        .findOneAndUpdate(
          { UserID: userId, deleted: { $ne: true } },
          { deleted: true },
        )
        .exec();
      if (!result) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to delete user: ${error.message}`);
    }
  }

  // Get all skills for a user
  async getUserSkills(userId: string): Promise<Skill[]> {
    try {
      const user = await this.userModel
        .findOne({ UserID: userId, deleted: { $ne: true } })
        .exec();

      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      return user.SkillSet || [];
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        `Failed to get user skills: ${error.message}`,
      );
    }
  }

  // Add a skill to a user
  async addSkill(userId: string, skillDto: SkillDto): Promise<User> {
    try {
      const user = await this.userModel
        .findOne({ UserID: userId, deleted: { $ne: true } })
        .exec();

      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      // Check if skill with the same name already exists
      const existingSkill = user.SkillSet?.find(
        (skill) => skill.Name === skillDto.Name,
      );

      if (existingSkill) {
        throw new BadRequestException(
          `Skill with name ${skillDto.Name} already exists for this user`,
        );
      }

      // Create new skill
      const newSkill = {
        Name: skillDto.Name,
        Description: skillDto.Description,
        Expertise: {
          ExpertiseID: skillDto.Expertise.ExpertiseID,
          Name: skillDto.Expertise.Name,
        },
      };

      // Add skill to user's skill set
      if (!user.SkillSet) {
        user.SkillSet = [];
      }

      user.SkillSet.push(newSkill as Skill);

      // Save updated user
      return user.save();
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new BadRequestException(`Failed to add skill: ${error.message}`);
    }
  }

  // Remove a skill from a user
  async removeSkill(userId: string, skillName: string): Promise<User> {
    try {
      const user = await this.userModel
        .findOne({ UserID: userId, deleted: { $ne: true } })
        .exec();

      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      // Check if skill exists
      if (!user.SkillSet || user.SkillSet.length === 0) {
        throw new NotFoundException(`User has no skills`);
      }

      const initialLength = user.SkillSet.length;
      user.SkillSet = user.SkillSet.filter((skill) => skill.Name !== skillName);

      if (user.SkillSet.length === initialLength) {
        throw new NotFoundException(`Skill with name ${skillName} not found`);
      }

      // Save updated user
      return user.save();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to remove skill: ${error.message}`);
    }
  }

  // Search users by skill
  async searchBySkill(skillName: string): Promise<User[]> {
    try {
      return this.userModel
        .find({
          deleted: { $ne: true },
          'SkillSet.Name': skillName,
        })
        .exec();
    } catch (error) {
      throw new BadRequestException(
        `Failed to search users by skill: ${error.message}`,
      );
    }
  }
}
