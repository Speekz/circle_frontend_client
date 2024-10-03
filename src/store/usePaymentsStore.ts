import { create } from "zustand";

interface IPayments {
  payments: any[];
  addPayment: (newPayment: any) => void;
}

export const usePaymentsStore = create<IPayments>()((set) => ({
  payments: [],
  addPayment: (newPayment: any) =>
    set(({ payments }) => ({
      payments: [...payments, newPayment],
    })),
}));
