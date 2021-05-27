
import jwt from "jsonwebtoken"

export const VerifyToken = (token: string): {
    verified: boolean,
    claims?: {
        ID: string
    } 
} => {    
    try {
        const claims = jwt.verify(token, process.env.JWT_SECRET!)

        return {
            verified: true,
            claims: {
                ID: (claims as any).ID
            }
        }
    } catch {
        return {
            verified: false
        }
    }
}