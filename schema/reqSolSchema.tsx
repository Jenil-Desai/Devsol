import { z } from "zod";

export const requestSolSchema = z.object({
  amount: z
    .coerce
    .number()
    .positive({ message: "Amount must be a positive number." })
})

export type RequestSolSchema = z.infer<typeof requestSolSchema>;
