import { Request, Response, Router } from 'express';
import logger from '../../infrastucture/logger/logger';
import { RolService } from '../../app/services/rol.service';
import { CreateRolDto } from '../../app/dtos/create.rol';

export class RolController {
    public router: Router;
    private rolService: RolService;

    constructor(rolService: RolService) {
        this.rolService = rolService;
        this.router = Router();
        this.routes();
    }

    public async getRolById(req: Request, res: Response): Promise<void> {
        logger.info("estoy dentro del UserById Controller");
        const { id } = req.params;
        const rolDto = await this.rolService.getRolById(id);

        if (!rolDto) {
            res.status(404).json({ message: 'Rol not found' });
            logger.error("Error de rol");
            return;
        }
        res.json(rolDto);
    }

    public async createRol(req: Request, res: Response): Promise<Response> {
        try {
            const rolDto: CreateRolDto = req.body;
            const rol = await this.rolService.createRol(rolDto);
            return res.status(201).json(rol);
        } catch (error) {
            logger.error("Error en Create rol", error)
            return res.status(400).json({ message: error });
        }
    }

    public async updateRol(req: Request, res: Response): Promise<Response> {
        try {
            const rolId = req.params.id;
            const rolDto: CreateRolDto = req.body;
            const rol = await this.rolService.updateRol(rolId, rolDto);
            return res.status(201).json(rol);
        } catch (error) {
            logger.error("Error en Update rol", error)
            return res.status(400).json({ message: error });
        }
    }

    public async deleteRol(req: Request, res: Response): Promise<Response> {
        try {
            const rolId = req.params.id;
            const rol = await this.rolService.deleteRol(rolId);
            return res.status(201).json(rol);
        } catch (error) {
            logger.error("Error en Delete rol", error)
            return res.status(400).json({ message: error });
        }
    }

    public routes() {
        this.router.get('/:id', this.getRolById.bind(this));
        this.router.post('/', this.createRol.bind(this));
        this.router.put('/:id', this.updateRol.bind(this));
        this.router.delete('/:id', this.deleteRol.bind(this));
    }
}
