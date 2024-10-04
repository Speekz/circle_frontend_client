import { StylesConfig } from "react-select";

export const selectorColourStyles: StylesConfig = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderColor: state.isFocused ? "#4f46e5" : "#d1d5db",
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isSelected
      ? "#4f46e5"
      : state.isFocused
      ? "#a5b4fc"
      : "white",
  }),
};
