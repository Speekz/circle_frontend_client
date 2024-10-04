import currency from "currency.js";

interface ICurrencyMapper {
  [currency: string]: (value: string) => currency;
}

export const currenciesMapper: ICurrencyMapper = {
  EUR: (value: string) => currency(value, { symbol: "€", precision: 2 }),
  USD: (value: string) => currency(value, { symbol: "$", precision: 2 }),
  JPY: (value: string) => currency(value, { symbol: "¥", precision: 2 }),
  GBP: (value: string) => currency(value, { symbol: "£", precision: 2 }),
  BTC: (value: string) => currency(value, { symbol: "₿", precision: 2 }),
};
