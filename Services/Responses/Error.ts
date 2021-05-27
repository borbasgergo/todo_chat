import { Response } from "express";

export const ErrorResponse = (res: Response, message: string) => {
    return res.json({
        error: message
    })
}