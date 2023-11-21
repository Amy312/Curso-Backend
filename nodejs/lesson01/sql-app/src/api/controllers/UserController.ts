import { Request, Response, Router } from 'express';
import { UserService } from './../../app/services/user.service';
import { CreateUserDTO } from '../../app/dtos/create.user.dto';
import logger from '../../infrastucture/logger/logger';
import { UpdateUserDTO } from '../../app/dtos/update.user.dto';
import { userValidatorRules, validate } from '../middleware/userValidator';

export class UserController {
    public router: Router;
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
        this.router = Router();
        this.routes();
    }

    public async getUserById(req: Request, res: Response): Promise<void> {
        logger.info("estoy dentro del UserById Controller");
        const { id } = req.params;
        const userDto = await this.userService.getUserById(id);

        if (!userDto) {
            res.status(404).json({ message: 'User not found' });
            logger.error("Error de usuario");
            return;
        }
        res.json(userDto);
    }

    public async createUser(req: Request, res: Response): Promise<Response> {
        try {
            const userDto: CreateUserDTO = req.body;
            const user = await this.userService.createUser(userDto);
            return res.status(201).json(user);
        } catch (error) {
            logger.error("Error en Create user", error)
            return res.status(400).json({ message: error });
        }
    }

    public async updateUser(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.params.id;
            const userDto: UpdateUserDTO = req.body;
            const user = await this.userService.updateUser(userId, userDto);
            return res.status(201).json(user);
        } catch (error) {
            logger.error("Error en Update user", error)
            return res.status(400).json({ message: error });
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.params.id;
            const user = await this.userService.deleteUser(userId);
            return res.status(201).json(user);
        } catch (error) {
            logger.error("Error en Delete user", error)
            return res.status(400).json({ message: error });
        }
    }

    public routes() {
        this.router.get('/:id', this.getUserById.bind(this));
        this.router.post('/', userValidatorRules(), validate, this.createUser.bind(this));
        this.router.put('/:id', this.updateUser.bind(this));
        this.router.delete('/:id', this.deleteUser.bind(this));
    }
}
