import { useEffect, useState } from "react";
import { api } from "../api";
import { Capter } from "../@types/capter";
import { Link } from "react-router-dom";
import { HeaderAllCapters } from "./components/HeaderAllCapters";

type OrderProps = {
  numberOrder: number;
};

const organizateOrder = (data: OrderProps, dataPrev: OrderProps) =>
  data.numberOrder - dataPrev.numberOrder;

export const ListCapters = () => {
  const [capters, setCapters] = useState<Capter[]>([]);

  useEffect(() => {
    const main = async () => {
      const response = await api.get<Capter[]>("/capter");
      setCapters(response.data);
    };
    main();
  }, []);

  return (
    <main className="py-14 px-24 bg-primary-800 text-primary space-y-12 min-h-screen">
      <HeaderAllCapters />
      <h1 className="text-4xl font-bold">Capítulos:</h1>
      <div className="space-y-4">
        {capters?.sort(organizateOrder).map((data: Capter) => (
          <div className="space-y-4" key={data.id}>
            <h2>
              {data.numberOrder} - {data.title}
            </h2>
            <ul className="flex gap-4">
              {data.Level.sort(organizateOrder).map((levelData) => (
                <li key={levelData.id}>
                  <Link
                    to="/activity"
                    className="btn bg-primary-600 inline-block text-base"
                  >
                    {levelData.numberOrder}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
};
