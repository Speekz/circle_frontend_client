import { NEXT_PUBLIC_MAX_PAYMENTS_COUNT } from "@/lib/environment";
import { filterPayments } from "@/lib/helpers";
import { IPayment, ITableColumns } from "@/lib/types";
import { TFilterPaymentsSchema } from "@/lib/validators/filterPaymentsSchema";
import { create } from "zustand";

interface IUsePaymentsStore {
  tableColumns: ITableColumns;
  setTableColumns: (newTableColumns: ITableColumns) => void;
  livePayments: boolean;
  toggleLivePayments: () => void;
  payments: IPayment[];
  filters: TFilterPaymentsSchema | null;
  setFilters: (newFilters: TFilterPaymentsSchema | null) => void;
  addPayment: (newPayment: IPayment) => void;
  getPaymentsFiltered: (
    count: number,
    filters: TFilterPaymentsSchema | null
  ) => IPayment[];
}

export const usePaymentsStore = create<IUsePaymentsStore>()((set, get) => ({
  livePayments: true,
  payments: [],
  filters: null,
  tableColumns: {
    transactionId: false,
    sender: true,
    receiver: true,
    amount: true,
    currency: true,
    memo: false,
    date: false,
  },
  addPayment: (newPayment) =>
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
  setFilters: (newFilters) =>
    set(() => ({
      filters: newFilters,
    })),
  getPaymentsFiltered: (count, filters) => {
    let payments = get().payments;
    if (!!filters) payments = filterPayments(get().payments, filters);

    if (payments.length > count) {
      return payments.slice(0, count);
    } else {
      return payments;
    }
  },
  toggleLivePayments: () =>
    set(({ livePayments }) => ({ livePayments: !livePayments })),
  setTableColumns: (newTableColumns) =>
    set(() => ({
      tableColumns: newTableColumns,
    })),
}));
