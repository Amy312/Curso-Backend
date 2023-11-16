import { IPermissionEntity } from '../entities/IPermissionEntity';
import { IRolEntity } from '../entities/IRolEntity';
import { v4 as uuidv4 } from 'uuid';

export class Rol {
    id: string;
    name: string;
    description: string;
    permissions: IPermissionEntity[];

    constructor(rolEntity: IRolEntity) {
        this.id = rolEntity.id || uuidv4();
        this.name = rolEntity.name;
        this.description = rolEntity.description;
        this.permissions = rolEntity.permissions;
    }

   
}
