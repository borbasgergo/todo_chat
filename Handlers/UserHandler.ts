import { PSW } from './../DB/Schema/Password';
import { IRegisterInput } from './../Types/Inputs/Register';
import { Request, Response } from "express";
import { User } from '../DB/Schema/User';
import { GenerateJWTToken } from '../Services/JWT/GenerateJWTToken';
import { EmailInUse } from '../Services/User/EmailInUse';
import { UsernameInUse } from '../Services/User/UsernameInUse';


export const login = (req: Request, res: Response) => {
    res.json(req.body)
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

        return res.json({
            token: GenerateJWTToken({
                ID: _user._id
            })
        })

    } catch(e) {

        return res.json({

            error: e.message

        })
    }
}