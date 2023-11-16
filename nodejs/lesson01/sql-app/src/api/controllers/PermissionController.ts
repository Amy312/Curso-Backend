import { Request, Response, Router } from 'express';
import logger from '../../infrastucture/logger/logger';
import { PermissionService } from '../../app/services/permission.service';
import { CreatePermissionDto } from '../../app/dtos/create.permission.dto';

export class PermissionController {
    public router: Router;
    private permissionService: PermissionService;

    constructor(permissionService: PermissionService) {
        this.permissionService = permissionService;
        this.router = Router();
        this.routes();
    }

    public async getPermissionById(req: Request, res: Response): Promise<void> {
        logger.info("estoy dentro del UserById Controller");
        const { id } = req.params;
        const permissionDto = await this.permissionService.getPermissionById(id);

        if (!permissionDto) {
            res.status(404).json({ message: 'Permission not found' });
            logger.error("Error de permiso");
            return;
        }
        res.json(permissionDto);
    }

    public async createPermission(req: Request, res: Response): Promise<Response> {
        try {
            const permissionDto: CreatePermissionDto = req.body;
            const permission = await this.permissionService.createPermission(permissionDto);
            return res.status(201).json(permission);
        } catch (error) {
            logger.error("Error en Create permission", error)
            return res.status(400).json({ message: error });
        }
    }

    public async updatePermission(req: Request, res: Response): Promise<Response> {
        try {
            const permissionId = req.params.id;
            const permissionDto: CreatePermissionDto = req.body;
            const permission = await this.permissionService.updatePermission(permissionId, permissionDto);
            return res.status(201).json(permission);
        } catch (error) {
            logger.error("Error en Update permission", error)
            return res.status(400).json({ message: error });
        }
    }

    public async deletePermission(req: Request, res: Response): Promise<Response> {
        try {
            const permissionId = req.params.id;
            const permission = await this.permissionService.deletePermission(permissionId);
            return res.status(201).json(permission);
        } catch (error) {
            logger.error("Error en Delete permission", error)
            return res.status(400).json({ message: error });
        }
    }

    public routes() {
        this.router.get('/:id', this.getPermissionById.bind(this));
        this.router.post('/', this.createPermission.bind(this));
        this.router.put('/:id', this.updatePermission.bind(this));
        this.router.delete('/:id', this.deletePermission.bind(this));
    }
}
