import { FaPen } from "react-icons/fa";

import { VITE_API_URL } from "../../../env";
import { User } from "../../../@types/auth";

export const CardUser = ({ name, picture, email }: User) => {
  const linkPerfil = VITE_API_URL + picture;
  console.log(linkPerfil);
  return (
    <div className="space-y-2 w-full p-4 bg-primary-800 text-primary-100 rounded-xl">
      <div className="flex justify-between">
        <span className="flex gap-2">
          <img src={linkPerfil} className="size-12 rounded-full" />
          <p className="text-base font-bold text-overflow">{name}</p>
        </span>
        <button className="btn bg-primary-600 p-2.5 size-10 content-center">
          <FaPen size={18} />
        </button>
      </div>
      <p className="text-overflow">
        <strong>E-mail:</strong> {email}
      </p>
    </div>
  );
};
