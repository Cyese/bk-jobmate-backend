import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Authentication } from './auth.schema';

@Injectable()
export class AuthService {
    constructor(@InjectModel(Authentication.name) private AuthenticationModel: Model<Authentication>) {}

    

}
