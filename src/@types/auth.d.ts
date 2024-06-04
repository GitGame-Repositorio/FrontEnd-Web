export type User = {
  id: string;
  email: string;
  picture: string;
  password: string;
  name: string | null;
  type: "anonymous" | "logged";
};

export type Anonymous = {
  id_user: string;
};

export type Admin = {
  id_userLogged: string;
  second_password: string;
};

export type Privilegies = {
  id: string;
  id_admin: string;
  canCreateAdmin: boolean;
  canDeleteAdmin: boolean;
  canViewAllAdmin: boolean;
  canEditPrivilegiesAdmin: boolean;
  canManageCRUDPlayer: boolean;
  canManageCRUDReports: boolean;
  canManageContentGame: boolean;
  canReorderContentGame: boolean;
};
