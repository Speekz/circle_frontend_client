import { z } from "zod";

export const createPaymentSchema = z
  .object({
    transactionId: z.string().length(16),
    sender: z.string(),
    receiver: z.string(),
    amount: z.string().refine(
      (v) => {
        const n = Number(v);
        return !isNaN(n) && v?.length > 0 && n !== 0;
      },
      { message: "Invalid number" }
    ),
    currency: z.string(),
    memo: z.string().optional(),
  })
  .refine((data) => data.sender !== data.receiver, {
    message: "Sender and receiver should be different",
  });

export type TPaymentSchema = z.infer<typeof createPaymentSchema>;
