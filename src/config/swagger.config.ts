import {DocumentBuilder} from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
    .setTitle('BKJobmate API')
    .setDescription('The NestJS API description')
    .setVersion('1.0')
    .addTag('nestjs')
    .addBearerAuth()
    .build();