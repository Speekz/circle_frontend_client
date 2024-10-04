import { z } from "zod";
import { isValidNumber } from "../helpers";

export const filterPaymentsSchema = z.object({
  transactionId: z.string().length(16).optional().or(z.literal("")),
  user: z.string().optional().or(z.literal(null)),
  minAmount: z
    .string()
    .refine(isValidNumber, { message: "Invalid number" })
    .optional()
    .or(z.literal("")),
  maxAmount: z
    .string()
    .refine(isValidNumber, { message: "Invalid number" })
    .optional()
    .or(z.literal("")),
  currency: z.string().optional().or(z.literal(null)),
  memo: z.string().optional().or(z.literal("")),
});

export type TFilterPaymentsSchema = z.infer<typeof filterPaymentsSchema>;
