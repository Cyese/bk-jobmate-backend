import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Authentication, AuthenticationSchema } from './auth.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Authentication.name,
        schema: AuthenticationSchema,
        collection: 'Authentication',
      },
    ]),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
