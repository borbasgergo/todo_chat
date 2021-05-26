import { HashPassword } from './../../Services/User/HashPassword';
import mongoose, { Schema, Document } from 'mongoose';

interface IPassword extends Document {
    Password: string,
    Hash: string
}

const PasswordSchema = new Schema({
    Password: {
        type: String,
        required: true,
        min: 6
    },
    Hash: {
        type:String
    }
})

PasswordSchema.pre("save", async function() {
    let _psw = this as IPassword

    const { salt, hashedPassword } = await HashPassword(_psw.Password)

    _psw.Hash = salt;
    _psw.Password = hashedPassword;

})

export const PSW = mongoose.model("Password", PasswordSchema)
