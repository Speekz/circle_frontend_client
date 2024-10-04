import { z } from "zod";
import { isValidNumber } from "../helpers";

export const createPaymentSchema = z
  .object({
    transactionId: z.string().length(16),
    sender: z.string(),
    receiver: z.string(),
    amount: z.string().refine(isValidNumber, { message: "Invalid number" }),
    currency: z.string(),
    memo: z.string().optional(),
  })
  .refine((data) => data.sender !== data.receiver, {
    message: "Sender and receiver should be different",
  });

export type TCreatePaymentSchema = z.infer<typeof createPaymentSchema>;
