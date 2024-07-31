export type User = {
  id: string;
  email: string;
  picture: string;
  password: string;
  name: string | null;
  phone: string;
  appearance: "LIGHT" | "DARK";
  works: string[];
  language: string;
  two_auth: boolean;
  admin: Privilegies;
  type: "anonymous" | "logged";
};

export type Anonymous = {
  id_user: string;
};

export type Admin = {
  id_userLogged: string;
  second_password: string;
  privilegies: Privilegies;
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
