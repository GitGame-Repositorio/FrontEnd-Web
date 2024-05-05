import { forwardRef } from "react";

export const InputText = forwardRef(({ ...rest }, ref) => {
  return (
    <input
      max="125"
      className="input"
      required
      ref={ref}
      {...rest}
    />
  );
});
