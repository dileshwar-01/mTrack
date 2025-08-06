import mongoose from "mongoose";
import userModel from "../models/userModel.js";


const addMem= async(req,res)=>{
   try {
     const{ name, type, startDate,endDate,price,skipCounter} = req.body;
     const userId =req.userId;
     const newMem={
         name,
         type,
         startDate:new Date(startDate),
         endDate: new Date(endDate),
         price,
         skipCounter
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

const getMems = async(req,res)=>{
    try {
        const userId= req.userId;
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(404).json({success:false,message:"User not found"});
        }
        const memberships= user.memData;
        res.status(200).json({success:true,memberships });
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:error.message});
    }

}

const removeMem = async(req,res)=>{
    try {
        const {memId}= req.body;
        const userId = req.userId;
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(404).json({success:false,message:"User not found"});
        }
        // Remove the membership by memId from memData
        const result = await userModel.updateOne(
          { _id: userId },
          { $pull: { memData: { _id: new mongoose.Types.ObjectId(memId) } } }
        );
    
        if (result.modifiedCount === 0) {
          return res.status(404).json({ success: false, message: "Membership not found or already removed" });
        }
    
        res.status(200).json({ success: true, message: "Membership removed successfully" });


    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:error.message});
    }
}

const updateSkips = async(req,res)=>{
    try {
        const {memId,newSkips}= req.body;
        const userId = req.userId;
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(404).json({success:false,message:"User not found"});
        }
        await userModel.updateOne(
            { _id: userId, "memData._id": memId },
            { $set: { "memData.$.skips": newSkips } }
        )
        res.status(200).json({ success: true, message: "Count updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:error.message});
    }
}

const updateMem = async (req, res) => {
    try {
        const { memId, name, endDate } = req.body;
        const userId = req.userId;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let updateFields = {};
        if (name) updateFields["memData.$.name"] = name;
        if (endDate) updateFields["memData.$.endDate"] = endDate;

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ success: false, message: "No valid fields to update" });
        }

        await userModel.updateOne(
            { _id: userId, "memData._id": memId },
            { $set: updateFields }
        );

        res.status(200).json({ success: true, message: "Membership info updated successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};



export{addMem,getMems,removeMem,updateSkips,updateMem};