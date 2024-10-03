import { NEXT_PUBLIC_MAX_PAYMENTS_COUNT } from "@/lib/environment";
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
    set(({ payments }) => {
      const modifiedPayments = payments;
      if (payments.length >= NEXT_PUBLIC_MAX_PAYMENTS_COUNT) {
        modifiedPayments.pop();
        modifiedPayments.unshift(newPayment);
      } else {
        modifiedPayments.unshift(newPayment);
      }

      return {
        payments: modifiedPayments,
      };
    }),
  getPayments: (count: number) => {
    if (get().payments.length > count) {
      return get().payments.slice(0, count);
    } else {
      return get().payments;
    }
  },
}));
