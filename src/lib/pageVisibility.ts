let windowOnFocus = true;

export const isWindowOnFocus = (): boolean => {
  return windowOnFocus;
};

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    windowOnFocus = true;
  } else {
    windowOnFocus = false;
  }
});
