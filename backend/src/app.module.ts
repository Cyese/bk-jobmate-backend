import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { UserModule } from './user/user.module';
import { AuthenService } from './authen/authen.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { CourseModule } from './course/course.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [DatabaseModule, ConfigModule, UserModule, CourseModule, ScheduleModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthenService, AuthService],
})
export class AppModule {}
