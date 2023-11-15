import { Request, Response, Router } from 'express';
import { UserService } from './../../app/services/user.service';
import { CreateUserDTO } from '../../app/dtos/create.user.dto';
import logger from '../../infrastucture/logger/logger';
import { UpdateUserDTO } from '../../app/dtos/update.user.dto';
import { LoginDTO } from '../../app/dtos/login.dto';
import { AuthService } from '../../app/services/auth.service';

export class AuthController {
    public router: Router;
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
        this.router = Router();
        this.routes();
    }

    
    public async login(req: Request, res: Response): Promise<Response> {
        try {
            const loginDto: LoginDTO = req.body;
            const loginResponse = await this.authService.login(loginDto);
            return res.status(201).json(loginResponse);
        } catch (error) {
            logger.error("Error en Create user", error)
            return res.status(400).json({ message: error });
        }
    }

    public routes() {
        this.router.post('/login', this.login.bind(this));
       
    }
}
