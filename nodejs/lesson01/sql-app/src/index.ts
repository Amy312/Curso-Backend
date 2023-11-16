import express, { Request, Response } from 'express';
import { UserController } from './api/controllers/UserController';
import { AppDataSource } from './infrastucture/config/dataSource';
import { UserService } from './app/services/user.service';
import { UserRepositoryImpl } from './infrastucture/repositories/user.reposity';
import morgan from "morgan";
import logger from './infrastucture/logger/logger'; 
import { env } from './infrastucture/config/config';
import { RolService } from './app/services/rol.service';
import { RolController } from './api/controllers/RolController';
import { RolRepositoryImpl } from './infrastucture/repositories/rol.repository';
import { PermissionRepositoryImpl } from './infrastucture/repositories/permission.repository';
import { PermissionService } from './app/services/permission.service';
import { PermissionController } from './api/controllers/PermissionController';

AppDataSource.initialize().then(() => {
    const app = express();
    const PORT = env.port;
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

    const permissionRepository = new PermissionRepositoryImpl();
    const permissionService = new PermissionService(permissionRepository);
    const permissionController = new PermissionController(permissionService);

    const rolRepository = new RolRepositoryImpl();
    const rolService = new RolService(rolRepository);
    const rolController = new RolController(rolService);
    
    const userRepository = new UserRepositoryImpl();
    const userService = new UserService(userRepository, rolRepository);
    const userController = new UserController(userService);



    app.use('/users', userController.router);
    app.use('/roles', rolController.router);
    app.use('/permissions', permissionController.router)

    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
}).catch(error => console.log(error));