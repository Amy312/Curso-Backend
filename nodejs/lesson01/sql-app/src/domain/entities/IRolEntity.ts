import { IPermissionEntity } from "./IPermissionEntity";

export interface IRolEntity {
    id?: string;
    name: string;
    description: string;
    permissions?: IPermissionEntity[];
}