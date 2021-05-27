import { ResponseJWT } from './../Services/Responses/JWT';
import { VerifyPassword } from './../Services/User/VerifyPassword';
import { ErrorResponse } from '../Services/Responses/Error';
import { ILoginInputs } from './../Types/Inputs/Login';
import { PSW } from './../DB/Schema/Password';
import { IRegisterInput } from './../Types/Inputs/Register';
import { Request, Response } from "express";
import { User } from '../DB/Schema/User';
import { EmailInUse } from '../Services/User/EmailInUse';
import { UsernameInUse } from '../Services/User/UsernameInUse'


export const login = async (req: Request, res: Response) => {

    try {
        const { Username, Password } = req.body as ILoginInputs;

        const user = await User.findOne({Username}).exec()
        
        if(! user){
            throw new Error("User does not exist!")
        }

        const password = await PSW.findById((user as any).Pid!).exec()

        if(! await VerifyPassword(Password, (password as any).Password)) {
            throw new Error("Password error")
        }
        
        return ResponseJWT(res, user.id)

    } catch(e) {
        return ErrorResponse(res, e.message)
    }
}

export const register = async (
    req: Request, 
    res: Response
) => {

    try {

        const { Username, Password, Email } = req.body as IRegisterInput;

        if(await EmailInUse(Email)) {
            throw new Error("Email already exist!")
        }

        if(await UsernameInUse(Username)) {
            throw new Error("Username already exist!")
        }

        const _psw = new PSW({
            Password
        })

        if(_psw.validateSync()) {
            throw new Error("Password is too short!")
        }

        const _user = new User({
            Username, 
            Email,
            Pid: _psw._id
        })


        if(_user.validateSync()) {
            throw new Error("Invalid username and/or email!")
        }
        
        await _psw.save();
        await _user.save();

        return ResponseJWT(res, _user.id)

    } catch(e) {

        return ErrorResponse(res, e.message)
    }
}