import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({})
export class ConfigModule {
  static get(key: string): string {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Configuration key "${key}" is not defined in the .env file`);
    }
    return value;
  }
}