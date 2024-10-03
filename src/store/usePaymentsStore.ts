import { IPayment } from "@/lib/types";
import { create } from "zustand";

interface IUsePaymentsStore {
  payments: IPayment[];
  addPayment: (newPayment: IPayment) => void;
}

export const usePaymentsStore = create<IUsePaymentsStore>()((set) => ({
  payments: [],
  addPayment: (newPayment: IPayment) =>
    set(({ payments }) => ({
      payments: [...payments, newPayment],
    })),
}));
