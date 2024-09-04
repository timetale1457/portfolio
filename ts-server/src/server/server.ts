import express, { Request, Response, NextFunction } from 'express';
import logger from '../util/logger';

const PORT = process.env.SRV_PORT || 3000;

class Server {
    private app: express.Express = express();
    constructor() {
    }
    public start() {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            logger.info(`Request method: ${req.method}, URL: ${req.url}`);
            next();
        });
        this.app.use((req: Request, res: Response) => {
            logger.warn(`404 Not Found - ${req.method} ${req.url}`);
            res.status(404).send('Not Found');
        });
        this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            logger.error(`500 Internal Server Error - ${err.message}`);
            res.status(500).send('Internal Server Error');
        });
        this.app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
        });
    }
}


export default new Server();