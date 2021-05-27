import { GenerateJWTToken } from './../JWT/GenerateJWTToken';
import { Response } from "express"


export const ResponseJWT = (res: Response, id: number) => {
    return res.json({
        token: GenerateJWTToken({ID: id})
    })
}