import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  // Create a new user
  async create(userDto: UserDto): Promise<User> {
    const newUser = new this.userModel(userDto);
    return newUser.save();
  }

  // Get a single user by ID
  async findOne(userId: string): Promise<User> {
    const user = await this.userModel.findOne({ UserID: userId, deleted: { $ne: true } }).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }

  // Get many users
  async findAll(): Promise<User[]> {
    return this.userModel.find({ deleted: { $ne: true } }).exec();
  }

  // Update a user by ID
  async update(userId: string, userDto: Partial<UserDto>): Promise<User> {
    const updatedUser = await this.userModel
      .findOneAndUpdate({ UserID: userId, deleted: { $ne: true } }, userDto, { new: true })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return updatedUser;
  }

  // Soft delete a user by ID
  async delete(userId: string): Promise<void> {
    const result = await this.userModel
      .findOneAndUpdate({ UserID: userId, deleted: { $ne: true } }, { deleted: true })
      .exec();
    if (!result) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  }
}