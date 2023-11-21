import { v4 as uuidv4 } from 'uuid';
import { IPermissionEntity } from '../entities/IPermissionEntity';
import { IRolEntity } from '../entities/IRolEntity';

export class Permission {
    id: string;
    name: string;
    description: string;
  //  roles: IRolEntity[];

    constructor(permissionEntity: IPermissionEntity) {
        this.id = permissionEntity.id || uuidv4();
        this.name = permissionEntity.name;
        this.description = permissionEntity.description;
    //    this.roles = permissionEntity.roles;
    }

   
}
