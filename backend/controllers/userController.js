import userModel from "../models/userModel.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//user login
const login= async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User doesn't exists"})
        }
        // if user exists then compare its password
        const isMatch = await bcrypt.compare(password,user.password);
        if(isMatch){
            const token =  createToken(user._id);
            res.json({success:true, token})
        }else{
            res.json({success:false, message:"Invalid Credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//user register
const signup = async(req,res)=>{
   try {
     const{name,email,password} = req.body;
    const exists = await userModel.findOne({email});
    if(exists){
        return res.json({ success: false, message: "User already exists" });
    }
    //validating email and pass
    if(!validator.isEmail(email)){
       return res.json({success:false,message:"Enter valid email"})
    }
    if(password.length <8){
        return res.json({success:false, message:"Please enter a strong password"})
    }

    // after validating both , we will register the user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const newUser=new userModel({
        name,
        email,
        password: hashedPassword
    })
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({success:true,token});
   } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
   }
    
}

export{signup,login}