import { Controller} from '@nestjs/common';

import { Body, Post } from '@nestjs/common';
@Controller('auth')
export class AuthController {
    @Post("signup")
    signup(@Body('email') email: string, @Body('password') password: string)  : string {
        // Check username for
        return "haha";
    }

    
    
}
