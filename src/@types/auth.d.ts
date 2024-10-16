export type User = {
  id: string;
  email: string;
  picture: string;
  password: string;
  name: string | null;
  phone: string;
  works: string[];
  isAdmin: boolean;
  language: string;
  two_auth: boolean;
  admin: Privilegies;
  appearance: "LIGHT" | "DARK";
  type: "anonymous" | "logged";
};

export type Anonymous = {
  id_user: string;
};

export type Admin = {
  id_userLogged: string;
  privilegies: Privilegies;
} & User;

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
