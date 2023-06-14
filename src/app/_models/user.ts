import {PBXUser} from "./pbx-user";
import {Role} from "./role";

export interface User {
  id: number;
  username: string;
  password: string;
  pbxUser: PBXUser;
  roles: Role[];
}
