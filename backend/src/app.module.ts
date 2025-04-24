import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { CourseModule } from './course/course.module';
import { ScheduleModule } from './schedule/schedule.module';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';

@Module({
  imports: [DatabaseModule, ConfigModule, UserModule]
})
export class AppModule {}
