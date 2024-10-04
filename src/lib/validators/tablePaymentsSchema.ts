import { z } from "zod";

export const tablePaymentsSchema = z.object({
  transactionId: z.boolean(),
  sender: z.boolean(),
  receiver: z.boolean(),
  amount: z.boolean(),
  currency: z.boolean(),
  memo: z.boolean(),
  date: z.boolean(),
});

export type TTablePaymentsSchema = z.infer<typeof tablePaymentsSchema>;
