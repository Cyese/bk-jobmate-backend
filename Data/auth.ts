import mongoose,  {Schema} from "mongoose";

const AuthenticateSchema = new Schema({
    UserID : { type: mongoose.Schema.Types.ObjectId, Ref:"User",  required: true},
    // Split email into 2 part for faster storage and indexing
    // EmailAddress@EmailDomain 
    // Can try to mimic DNS resolver behaviour
    // May expand to use OpenAuth later
    EmailAddress: {type: String, required: true},
    EmailDomain: {type:String, required: true},
    Password: {type:String, required:true},
    OAuth: {
        Token: {type: String, required: true},
        IDP: {type: String, required: true},
        required: false
    }
});
AuthenticateSchema.index({EmailDomain:1})

export const AuthenModel = mongoose.model("Credential", AuthenticateSchema)
