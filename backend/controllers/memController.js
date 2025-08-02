import userModel from "../models/userModel.js";


const addMem= async(req,res)=>{
   try {
     const{userId, name, type, startDate,endDate} = req.body;
     const newMem={
         name,
         type,
         startDate:new Date(startDate),
         endDate: new Date(endDate),

     }
     const user =await userModel.findById(userId)
     if(!user){
        return res.status(404).json({success:false,message:"User not found"})
     }
     user.memData.push(newMem);
     await user.save();
     res.json({success:true,message:"Membership info added"});
   } catch (error) {
    console.log(error);
    res.json({success:false, message:error.message});
   }
}

export{addMem}