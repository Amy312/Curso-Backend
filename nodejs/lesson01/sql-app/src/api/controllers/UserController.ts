import { Request, Response, Router } from 'express';
import { UserService } from './../../app/services/user.service';
import { CreateUserDTO } from '../../app/dtos/create.user.dto';
import logger from '../../infrastucture/logger/logger';

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

    public routes() {
        this.router.get('/:id', this.getUserById.bind(this));
        this.router.post('/', this.createUser.bind(this));
    }
}
