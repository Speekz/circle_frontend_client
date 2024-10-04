import { IPayment } from "../types";
import { TFilterPaymentsSchema } from "../validators/filterPaymentsSchema";

export const filterPayments = (
  payments: IPayment[],
  filters: TFilterPaymentsSchema
) => {
  const checkFilters = {
    checkForTransactionId: filters.transactionId !== "",
    checkForUserId: filters.user !== null,
    checkForMinAmount: filters.minAmount !== "",
    checkForMaxAmount: filters.maxAmount !== "",
    checkForCurrency: filters.currency !== null,
    checkForMemoIncludes: filters.memo !== "",
  };

  let filteredPayments: IPayment[] = [];

  for (let payment of payments) {
    if (checkFilters.checkForTransactionId) {
      const validateTransactionId = filterTransactionId(
        payment.id,
        filters.transactionId as string
      );
      if (!validateTransactionId) continue;
    }

    if (checkFilters.checkForUserId) {
      const validateSenderUserId = filterUserId(
        payment.sender,
        filters.user as string
      );
      const validateReceiverUserId = filterUserId(
        payment.sender,
        filters.user as string
      );
      if (!validateSenderUserId && !validateReceiverUserId) continue;
    }

    if (checkFilters.checkForMinAmount) {
      const validateMinAmount = filterMinAmount(
        payment.amount,
        filters.minAmount as string
      );
      if (!validateMinAmount) continue;
    }

    if (checkFilters.checkForMaxAmount) {
      const validateMaxAmount = filterMaxAmount(
        payment.amount,
        filters.minAmount as string
      );
      if (!validateMaxAmount) continue;
    }

    if (checkFilters.checkForCurrency) {
      const validateCurrency = filterCurrency(
        payment.currency,
        filters.currency as string
      );
      if (!validateCurrency) continue;
    }

    if (checkFilters.checkForMemoIncludes) {
      const validateMemoIncludes = filterMemoIncludes(
        payment.memo,
        filters.memo as string
      );
      if (!validateMemoIncludes) continue;
    }

    filteredPayments.push(payment);
  }

  return filteredPayments;
};

const filterTransactionId = (
  transactionId: IPayment["id"],
  filterTransactionId: string
): boolean => {
  return transactionId.includes(filterTransactionId);
};

const filterUserId = (
  user: IPayment["sender"],
  filterUser: string
): boolean => {
  return user.id === (JSON.parse(filterUser) as IPayment["sender"]).id;
};

const filterMinAmount = (
  amount: IPayment["amount"],
  filterAmount: string
): boolean => {
  return parseFloat(amount) > parseFloat(filterAmount);
};

const filterMaxAmount = (
  amount: IPayment["amount"],
  filterAmount: string
): boolean => {
  return parseFloat(amount) < parseFloat(filterAmount);
};

const filterCurrency = (
  currency: IPayment["currency"],
  filterCurrency: string
): boolean => {
  return currency === filterCurrency;
};

const filterMemoIncludes = (
  memo: IPayment["memo"],
  filterMemo: string
): boolean => {
  if (!memo) return false;

  return memo.includes(filterMemo);
};
