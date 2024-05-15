import mongoose from "mongoose";

const Schema = mongoose.Schema;

const typeSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true
      },
      password: {
        type: String,
        required: true,
      },
      point : {
        type : Number,
        required : true,
        default : 0
      }
      
})

const User = mongoose.model("User", typeSchema);

export default User;