import express, { Request, Response } from 'express';
import { AppDataSource } from './infrastucture/config/dataSource';
import morgan from "morgan";
import logger from './infrastucture/logger/logger'; 
import { env } from './infrastucture/config/config';
import { routes } from './api/controllers/apiRoutes';
import { limiter } from './api/middleware/rate.limiter';

AppDataSource.initialize().then(() => {
    const app = express();
    const PORT = env.port;
    console.log(PORT);

    app.use(express.json());
    app.use(limiter);
    app.use(
        morgan("combined", {
            stream: { write: (message: string) => logger.info(message.trim()) },
        })
        );
    app.get('/', (req: Request, res: Response) => {
        res.send('¡Hola Mundo con Express y TypeScript ssssss!');
    });

    routes(app);

    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
}).catch(error => console.log(error));