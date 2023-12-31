import { IUserBase } from "src/app/shared/models/userBase.model";
import { RolType } from './rol.enum';

export interface User extends IUserBase{
    roles: RolType[];
    token: string;
    password: string;
}