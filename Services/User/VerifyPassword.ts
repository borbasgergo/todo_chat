
import bcrypt from "bcrypt"

export const VerifyPassword = async (password: string, hash: string) => {

    if( await bcrypt.compare(password, hash) ) {
        return true
    }
    
    return false
}