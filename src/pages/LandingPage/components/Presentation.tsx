import { Link } from "react-router-dom";

export const Presentation = () => {
  return (
    <div className="container">
      <div className="my-20 text-center space-y-5">
        <button className="btn-presentation">
          <p className="text-linear">jogo de git</p>
        </button>
        <span className="content-center flex-col space-y-3">
          <h1 className="w-4/6 text-4xl sm:text-5xl md:text-6xl font-medium">
            Descubra o Universo do Git de Forma Descomplicada
          </h1>
          <p className="text-base sm:text-lg md:text-xl w-3/6">
            Aprenda os Conceitos Essenciais do Controle de Versão e Colaboração
            com Nosso Jogo Interativo de Git!
          </p>
        </span>
        <div>
          <Link to="/all-capters">
            <button className="btn border border-solid border-primary-600 text-primary-600 uppercase font-bold text-sm sm:text-base">
              Let’s Go To Play
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
