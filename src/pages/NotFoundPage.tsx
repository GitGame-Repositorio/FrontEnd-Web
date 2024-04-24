import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="h-screen p-4 text-center content-center bg-primary-50">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-3xl">Não encontramos a página</h1>
        <div>Por favor confira se o endereço buscado está correto</div>
        <Link to="/" className="text-primary-700">
          Ir para a tela inicial
        </Link>
      </div>
    </div>
  );
}
