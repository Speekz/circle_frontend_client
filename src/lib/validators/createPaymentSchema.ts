import { z } from "zod";

export const createPaymentSchema = z.object({
  transactionId: z.string().length(16),
  sender: z.object({
    label: z.string(),
    value: z.string(),
  }),
  receiver: z.object({
    label: z.string(),
    value: z.string(),
  }),
  amount: z.string().refine(
    (v) => {
      let n = Number(v);
      return !isNaN(n) && v?.length > 0 && n !== 0;
    },
    { message: "Invalid number" }
  ),
  currency: z.object({
    label: z.string(),
    value: z.string(),
  }),
  memo: z.string().optional(),
});
