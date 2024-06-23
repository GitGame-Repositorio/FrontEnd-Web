import { FiEye, FiEyeOff } from "react-icons/fi";
import { forwardRef, useState } from "react";
import theme from "../../../service/tailwindTheme";

export const InputPassword = forwardRef(({ ...rest }, ref) => {
  const [visible, setVisible] = useState(false);
  const Icon = visible ? FiEye : FiEyeOff;
  return (
    <div className="flex items-center">
      <input
        className="input input-icon"
        placeholder="Digite sua senha..."
        type={visible ? "text" : "password"}
        ref={ref}
        {...rest}
      />
      <Icon
        size={25}
        color={theme.colors.primary[800]}
        className="-ml-8 cursor-pointer"
        onClick={() => setVisible(!visible)}
      />
    </div>
  );
});
