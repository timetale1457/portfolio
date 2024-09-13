import express, { Request, Response, NextFunction } from 'express';
import logger from '../util/logger';
import v1_router from './router_v1';
import passport from './router_v1/test/auth/auth';
import session from 'express-session'; // express-session 모듈 추가

const PORT = process.env.SRV_PORT || 3000;

class Server {
    private app: express.Express = express();
    constructor() {
    }
    public start() {
        this.initialize();
        this.listenPort();
    }
    private initialize() {
        this.app.use(session({
            secret: process.env.GOOGLE_CLIENT_SECRET || 'secretKey',  // 세션 암호화에 사용할 비밀키
            resave: false,
            saveUninitialized: false,
            cookie: { secure: false },  // HTTPS 사용 시 true로 설정
        }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use('/api/v1', v1_router);
        this.setCommonRouter();
    }
    private setCommonRouter() {
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
    }
    private listenPort() {
        this.app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
        });
    }
}


export default new Server();