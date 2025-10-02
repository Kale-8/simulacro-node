import {z} from "zod";

export const registerEventSchema = z.object({eventId: z.number().int().positive()});