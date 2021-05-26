import { FindUser } from "./FindUser"

export const UsernameInUse = async (Username: string) => {
    if(await FindUser({Username})) {
        return true
    }

    return false
}