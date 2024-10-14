import { User } from "../../../@types/auth";
import { Report } from "../../../@types/game";

export type Record = Report & User;
export type ListKey = Array<keyof Record>