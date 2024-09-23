import { FaEye, FaPen } from "react-icons/fa";

import { VITE_API_URL } from "../../../../../env";
import { User } from "../../../../../@types/auth";
import { Card } from "../../../../../common/Card";

type CardUserProps = {
  user: User;
  canEditUser: boolean;
  canViewUser: boolean;
  openModal: (mode: "view" | "edit") => void;
};

export const CardUser = ({
  user,
  canEditUser,
  canViewUser,
  openModal,
}: CardUserProps) => {
  const { name, picture, email } = user;
  const linkPerfil = VITE_API_URL + picture;

  return (
    <Card className="space-y-2 cursor-auto w-full p-4 text-primary-100">
      <>
        <div className="flex justify-between">
          <span className="flex gap-2">
            <img src={linkPerfil} className="size-12 rounded-full" />
            <p className="text-base font-bold text-overflow">{name}</p>
          </span>
          <div className="flex gap-2">
            {canViewUser && (
              <button
                onClick={() => openModal("view")}
                className="btn bg-primary-600 p-2.5 size-10 content-center"
              >
                <FaEye size={18} />
              </button>
            )}
            {canEditUser && (
              <button
                onClick={() => openModal("edit")}
                className="btn bg-primary-600 p-2.5 size-10 content-center"
              >
                <FaPen size={18} />
              </button>
            )}
          </div>
        </div>
        <p className="text-overflow">
          <strong>E-mail:</strong> {email}
        </p>
      </>
    </Card>
  );
};
