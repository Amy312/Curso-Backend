import express, { Request, Response } from 'express';
import { UserController } from './api/controllers/UserController';
import { AppDataSource } from './infrastucture/config/dataSource';
import { UserService } from './app/services/user.service';
import { UserRepositoryImpl } from './infrastucture/repositories/user.reposity';
import morgan from "morgan";
import logger from './infrastucture/logger/logger'; 
import { env } from './infrastucture/config/config';

AppDataSource.initialize().then(() => {
    const app = express();
    const PORT = env.envPort;
    console.log(PORT);

    app.use(express.json());
    app.use(
        morgan("combined", {
            stream: { write: (message: string) => logger.info(message.trim()) },
        })
        );
    app.get('/', (req: Request, res: Response) => {
        res.send('¡Hola Mundo con Express y TypeScript ssssss!');
    });

    const userRepository = new UserRepositoryImpl();
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);


    app.use('/users', userController.router);

    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
}).catch(error => console.log(error));