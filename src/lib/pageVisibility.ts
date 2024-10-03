let windowOnFocus = true;

export const isWindowOnFocus = (): boolean => {
  return windowOnFocus;
};

if (typeof window !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      windowOnFocus = true;
    } else {
      windowOnFocus = false;
    }
  });
}
