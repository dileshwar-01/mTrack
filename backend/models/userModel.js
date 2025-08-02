import mongoose, { mongo } from "mongoose";
const { Schema } = mongoose;

const membershipSchema = new Schema({
    name:{type:String, required: true},
    type:{type:String, required:true},
    startDate:{type:Date, required:true},
    endDate:{type:Date, required:true},
    skips:{type:Number, default:0},
    isActive:{type:Boolean,required:true}
},{_id:false});

const userSchema= new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    memData:{type:[membershipSchema],default:[]}

},{timestamps:true});

const userModel= mongoose.model.user || mongoose.model('user',userSchema);
export default userModel;