import { IPayment } from "@/lib/types";
import { create } from "zustand";

interface IUsePaymentsStore {
  payments: IPayment[];
  addPayment: (newPayment: IPayment) => void;
  getPayments: (count: number) => IPayment[];
}

export const usePaymentsStore = create<IUsePaymentsStore>()((set, get) => ({
  payments: [],
  addPayment: (newPayment: IPayment) =>
    set(({ payments }) => ({
      payments: [newPayment, ...payments],
    })),
  getPayments: (count: number) => {
    if (get().payments.length > count) {
      return get().payments.slice(0, count);
    } else {
      return get().payments;
    }
  },
}));
