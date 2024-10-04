export const currencies: string[] = [`BTC`, `GBP`, `EUR`, `JPY`, `USD`];

export const currenciesForSelector = currencies.map((currency) => ({
  value: currency,
  label: currency,
}));

export const tableHeadColumnsValues = [
  { name: "transactionId", value: "Transaction ID" },
  { name: "sender", value: "Sender Name" },
  { name: "receiver", value: "Receiver Name" },
  { name: "amount", value: "Amount" },
  { name: "currency", value: "Currency" },
  { name: "date", value: "Date" },
  { name: "memo", value: "Memo" },
];
