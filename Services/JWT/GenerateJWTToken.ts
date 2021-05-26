import { IUserDetails } from '../../Types/UserDetails';

import jwt from "jsonwebtoken"

export const GenerateJWTToken = ({ID}: IUserDetails) => {

    return jwt.sign({ID}, process.env.JWT_SECRET!)

}