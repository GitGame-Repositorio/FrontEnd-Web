import { GoArrowLeft } from "react-icons/go";
import { Link } from "react-router-dom";
import theme from "../../../service/tailwindTheme";

export const DivLinks = () => {
  return (
    <div className="flex justify-between">
      <Link to="/" className="flex gap-2 items-center">
        <GoArrowLeft size={26} color={theme.colors.primary[100]} />
        <p className="text-lg font-medium">Voltar</p>
      </Link>
      <Link
        to="/recovery-password"
        className="text-base text-right font-medium underline"
      >
        Esqueceu a senha?
      </Link>
    </div>
  );
};
