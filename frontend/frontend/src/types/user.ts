import { Task } from "./task";

export type UserData = {
    tasks: Task[];
    uuid: string;
  }


export type UserTokens = {
  exp: number
  iat: number
  token_type: string
  user_id: string
  jti: string
  email: string
}