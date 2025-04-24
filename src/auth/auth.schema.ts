import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AuthenticationDocument = HydratedDocument<Authentication>;

@Schema()
export class Authentication {
    @Prop({ required: true })
    UserID: string;

    @Prop({ required: true })
    EmailAddress: string;
    
    @Prop({ required: true })
    EmailDomain: string;
    
    @Prop({ required: true })
    Password: string;


    @Prop({
        type: {
            Token: { type: String },
            IDP: { type: String }
        },
        required: false
    })
    OAuth: { Token: string; IDP: string };
}

export const AuthenticationSchema = SchemaFactory.createForClass(Authentication);
AuthenticationSchema.index({EmailDomain:1})
