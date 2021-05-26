import bcrypt from "bcrypt"

interface IHashPasswordReturn {
    salt: string,
    hashedPassword: string
}
export const HashPassword = async (
    plainPassword: string
): Promise<IHashPasswordReturn> => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    return {
        salt, 
        hashedPassword
    }
}