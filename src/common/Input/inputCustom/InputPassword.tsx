import { useState } from "react";

export const InputPassword = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex">
      <input
        className="input"
        placeholder="Digite sua senha..."
        type={visible ? "text" : "password"}
      />
      <img
        src={visible ? "/eye.svg" : "/eye-off.svg"}
        onClick={() => setVisible(!visible)}
        className="-ml-8 cursor-pointer"
      />
    </div>
  );
};
