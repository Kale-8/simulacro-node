import {z} from "zod";

export const createEventSchema = z.object({
    title: z.string().min(3),
    description: z.string().optional(),
    date: z.string().refine(s => !Number.isNaN(Date.parse(s))),
    location: z.string().min(2),
    capacity: z.number().int().positive()
});