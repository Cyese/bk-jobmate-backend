import mongoose, {  Schema } from "mongoose";

const Skill= new Schema({
    Expertise: {
        ExpertiseID: {type: String, required: true, unique:true},
        Name: {type: String, required: true}
    },
    Name: {type: String, required: true, unique: true},
});


const UserSchema = new Schema({
    Name: {type: String, required: true},
    Avatar :{type:String, required: true }, // To be implemented, path to store avatar on server
    UserID: {type: String, required: true, unique:true},
    SkillSet: [Skill],
    JobRole: {type: String, required: false} // Quick Fetch current Job 
});

const ExperienceSchema = new Schema({
    UserID: {type: mongoose.Schema.Types.ObjectId, ref:"User", required: true},
    Period : {
        Start: {type: Date, required: true},
        End: {type:Date, required: true}
    },
    JobRole: {type: String, required: false},
    Description: {type: String, required: false}
});

export const UserModel = mongoose.model("User", UserSchema);
export const ExprienceModel = mongoose.model("Experience", ExperienceSchema);