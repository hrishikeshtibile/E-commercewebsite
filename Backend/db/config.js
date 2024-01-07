import mongoose from "mongoose";
async function connectDb(){
    try{
      await mongoose.connect("mongodb://127.0.0.1:27017/e-commerce");
      // await mongoose.connect("mongodb://localhost:27017/e-commerce");
      console.log("Db connected");
    }catch(error){
      console.error(error);
    }
};

export default connectDb;
