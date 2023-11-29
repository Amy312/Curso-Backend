import { Request, Response, Router } from 'express';
import { UserService } from './../../app/services/user.service';
import { CreateUserDTO } from '../../app/dtos/create.user.dto';
import logger from '../../infrastucture/logger/logger';
import { UpdateUserDTO } from '../../app/dtos/update.user.dto';
import { userValidatorRules, validate } from '../middleware/userValidator';
import { verifyTokenMiddleware } from '../middleware/verifyToken';

export class UserController {
    public router: Router;
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
        this.router = Router();
        this.routes();
    }

     /**
     * @swagger
     * /api/users/{userId}:
     *   get:
     *     summary: Inicia sesión de un usuario en sql app
     *     tags: [Users]
     *     parameters:
     *     - in: path
     *       name: userId
     *     schema:
     *      type: integer
     *     required: true
     *     responses:
     *       200:
     *         description: Inicio de sesión exitoso
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: string
     *                 email:
     *                   type: object
     *                   properties:
     *                     id:
     *                       type: string
     *                     username:
     *                       type: string
     *       400:
     *         description: Error en la solicitud
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *       401:
     *         description: Credenciales inválidas
     */
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
/**
 * @swagger
 * /api/users/:
 *   post:
 *     summary: Inicia sesión de un usuario en la aplicación SQL
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUser'
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     username:
 *                       type: string
 *       400:
 *         description: Error en la solicitud
 *       401:
 *         description: Credenciales inválidas
 */

    public async createUser(req: Request, res: Response): Promise<Response> {
        try {
            const userDto: CreateUserDTO = req.body;
            console.log("🚀 ~ file: UserController.ts:116 ~ UserController ~ createUser ~ userDto:", userDto)
            const user = await this.userService.createUser(userDto);
            return res.status(201).json(user);
        } catch (error) {
            logger.error("Error en Create user", error)
            return res.status(400).json({ message: error });
        }
    }
/**
 * @swagger
 * /api/users/{userId}:
 *   put:
 *     summary: Actualiza la información de un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario que se va a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateByIdCredentials'
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedUser:
 *                   $ref: '#/components/schemas/CreateUser'
 *       400:
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

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
 /**
 * @swagger
 * /api/users/{userId}:
 *   delete:
 *     summary: Elimina un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario que se va a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

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
        this.router.get('/:id',verifyTokenMiddleware, this.getUserById.bind(this));
        this.router.post('/', userValidatorRules(), validate, this.createUser.bind(this));
        this.router.put('/:id', this.updateUser.bind(this));
        this.router.delete('/:id', this.deleteUser.bind(this));
    }
}
