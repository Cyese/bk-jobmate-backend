import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import  { Authentication, AuthenticationSchema } from './auth.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Authentication.name, schema: AuthenticationSchema, collection: 'Authentication' }
        ]),],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
