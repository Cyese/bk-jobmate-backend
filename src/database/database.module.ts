import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';
@Module({
    imports: [
        MongooseModule.forRoot(ConfigModule.get('MONGODB_URI')),
    ]

})
export class DatabaseModule {}