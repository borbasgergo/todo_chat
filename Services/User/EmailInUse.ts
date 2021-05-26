import { FindUser } from './FindUser';

export const EmailInUse = async (Email: string): Promise<boolean> => {

    const user = await FindUser({Email})
    if(user) {
        return true
    }

    return false
}