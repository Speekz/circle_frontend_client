import { IPayments } from "@/lib/types";
import { create } from "zustand";

interface IUsePaymentsStore {
  payments: IPayments[];
  addPayment: (newPayment: IPayments) => void;
}

export const usePaymentsStore = create<IUsePaymentsStore>()((set) => ({
  payments: [],
  addPayment: (newPayment: IPayments) =>
    set(({ payments }) => ({
      payments: [...payments, newPayment],
    })),
}));
