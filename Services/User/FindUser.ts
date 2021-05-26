import { User } from "../../DB/Schema/User"
import { IFindUserParams } from "../../Types/FindUserParams"


export const FindUser = async (by: IFindUserParams) => {
    return await User.findOne(by).exec()
}