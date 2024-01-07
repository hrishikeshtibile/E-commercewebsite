import mongoose from "mongoose";
// mongoose.connect("mongodb://localhost:27017/e-commerce");
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model("users", userSchema);

export default User;
