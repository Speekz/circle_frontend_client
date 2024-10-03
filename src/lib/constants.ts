export const currencies: string[] = [`BTC`, `GBP`, `EUR`, `JPY`, `USD`];

export const currenciesForSelector = currencies.map((currency) => ({
  value: currency,
  label: currency,
}));
