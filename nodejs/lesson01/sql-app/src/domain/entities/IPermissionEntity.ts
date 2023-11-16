import { IRolEntity } from "./IRolEntity";

export interface IPermissionEntity {
    id?: string;
    name:string;
    description:string;
    roles: IRolEntity[];
}