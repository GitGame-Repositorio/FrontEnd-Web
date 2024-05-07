import { forwardRef, useState } from "react";

export const InputPassword = forwardRef(({ ...rest }, ref) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex">
      <input
        className="input"
        placeholder="Digite sua senha..."
        type={visible ? "text" : "password"}
        ref={ref}
        {...rest}
      />
      <img
        src={visible ? "/eye.svg" : "/eye-off.svg"}
        onClick={() => setVisible(!visible)}
        className="-ml-8 cursor-pointer"
      />
    </div>
  );
});
