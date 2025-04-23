import mongoose, {Schema} from "mongoose";


const QuestionSchema = new Schema({
    QuestionID: {type: String, required: true, unique: true},
    Question: {type: String, required: true},
    Option: {type: [String], required: true, validate: (arr: string) => arr.length === 4},
    Answer:{type: Number, required: true, validate: (num: number) => (num <= 4 && num >= 1)}, // Hold correct answer
    Solution: {type: String, required: false}
})

const LessionSchema = new Schema({
    LesionID: {type:String,  required: true},
    Questions: [{ type: String, ref: 'QuestionSchema'}],
    Name: {type: String, required :true},
    Keyword: [{type:String}] // 
})

