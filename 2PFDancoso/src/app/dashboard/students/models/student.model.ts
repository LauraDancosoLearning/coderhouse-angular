import { IUserBase } from "src/app/shared/models/userBase.model";

export interface Student extends IUserBase{
    marks: number[]
}