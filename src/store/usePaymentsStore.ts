import { NEXT_PUBLIC_MAX_PAYMENTS_COUNT } from "@/lib/environment";
import { filterPayments } from "@/lib/helpers";
import { IPayment } from "@/lib/types";
import { TFilterPaymentsSchema } from "@/lib/validators/filterPaymentsSchema";
import { create } from "zustand";

interface IUsePaymentsStore {
  livePayments: boolean;
  toggleLivePayments: () => void;
  payments: IPayment[];
  addPayment: (newPayment: IPayment) => void;
  getPayments: (count: number) => IPayment[];
  getPaymentsFiltered: (filters: TFilterPaymentsSchema) => IPayment[];
}

export const usePaymentsStore = create<IUsePaymentsStore>()((set, get) => ({
  livePayments: true,
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
  getPaymentsFiltered: (filters: TFilterPaymentsSchema) => {
    return filterPayments(get().payments, filters);
  },
  toggleLivePayments: () =>
    set(({ livePayments }) => ({ livePayments: !livePayments })),
}));
