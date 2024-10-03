export const NEXT_PUBLIC_CIRCLE_API =
  process.env.NEXT_PUBLIC_CIRCLE_API || "http://localhost:8080";
export const NEXT_PUBLIC_MAX_PAYMENTS_COUNT =
  parseInt(process.env.NEXT_PUBLIC_MAX_PAYMENTS_COUNT || "") === 0
    ? 1000
    : parseInt(process.env.NEXT_PUBLIC_MAX_PAYMENTS_COUNT || "");
