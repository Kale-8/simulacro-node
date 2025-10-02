import {Request, Response, NextFunction} from "express";
import {ZodSchema} from "zod";

export function validate(schema: ZodSchema<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) return next({status: 400, message: result.error});
        req.body = result.data;
        next();
    };
}