import { Link } from "react-router-dom";

export const DivLinks = () => {
  return (
    <div className="flex justify-between">
      <Link to="/" className="flex gap-2">
        <img src="/arrow.svg" alt="<-" className="w-6" />
        <p className="text-lg font-medium">Voltar</p>
      </Link>
      <Link to="/recovery-password" className="text-base font-medium underline">
        Esqueceu a senha?
      </Link>
    </div>
  );
};
