import mongoose, { Schema } from 'mongoose';


const UserSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        min: 4,
        unique: true
    },
    Pid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Password"
    },
    Email: {
        type: String,
        required: true
    }
})



export const User = mongoose.model("User", UserSchema)