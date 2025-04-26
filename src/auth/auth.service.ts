import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Authentication } from './auth.schema';
import { SignupDto, LoginDto, AuthResponseDto } from './auth.dto';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/user.dto';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Authentication.name)
    private AuthenticationModel: Model<Authentication>,
    private userService: UserService,
  ) {}

  async signup(signupDto: SignupDto): Promise<AuthResponseDto> {
    const { email, password, name, avatar } = signupDto;

    // Check if user already exists
    const existingUser = await this.AuthenticationModel.findOne({
      EmailAddress: email.split('@')[0],
      EmailDomain: email.split('@')[1],
    }).exec();

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    // Create a new user ID
    const userId = crypto.randomUUID();

    // Hash the password (in a real app, use bcrypt)
    const hashedPassword = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');

    // Create new authentication record
    const newAuth = new this.AuthenticationModel({
      UserID: userId,
      EmailAddress: email.split('@')[0],
      EmailDomain: email.split('@')[1],
      Password: hashedPassword,
    });

    await newAuth.save();

    // Create a new user
    const userDto: UserDto = {
      name: name,
      avatar: avatar || 'https://via.placeholder.com/150',
      userId: userId,
      jobRole: '',
      skillSet: [],
    };

    try {
      await this.userService.create(userDto);
    } catch (error) {
      // If user creation fails, delete the authentication record
      await this.AuthenticationModel.deleteOne({ UserID: userId }).exec();
      throw new BadRequestException('Failed to create user: ' + error.message);
    }

    // In a real app, you would create a JWT token here
    const mockToken = 'mock-jwt-token-' + userId;

    return {
      accessToken: mockToken,
      userId: userId,
      name: name,
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = loginDto;

    // Find the user authentication
    const auth = await this.AuthenticationModel.findOne({
      EmailAddress: email.split('@')[0],
      EmailDomain: email.split('@')[1],
    }).exec();

    if (!auth) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password (in a real app, use bcrypt.compare)
    const hashedPassword = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');
    if (auth.Password !== hashedPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Get user details
    let userName = 'User';
    try {
      const userDetails = await this.userService.findOne(auth.UserID);
      if (userDetails) {
        userName = userDetails.Name;
      }
    } catch (error) {
      // If user not found, continue with default name
      console.log('User details not found:', error.message);
    }

    // In a real app, you would create a JWT token here
    const mockToken = 'mock-jwt-token-' + auth.UserID;

    return {
      accessToken: mockToken,
      userId: auth.UserID,
      name: userName,
    };
  }
}
