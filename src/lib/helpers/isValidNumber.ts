export const isValidNumber = (v: string) => {
  const n = Number(v);
  return !isNaN(n) && v?.length > 0 && n !== 0 && n > 0;
};
