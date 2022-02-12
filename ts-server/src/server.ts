import * as express from 'express'
import {Index} from './routes/index';
import * as path from 'path'
import {Logger} from './util/logger'

let logger: Logger = Logger.getInstance();
class Server {
    public app: express.Application;    
    public static bootstrap (): Server {
        return new Server();
    }
    constructor(){
        this.app = express();
        this.app.use(express.json());
    }
    async startServer(){
        Index.getInstance().setRoute(this.app);
        let config = require(path.join(process.cwd(), './config/config.json'));
        let logPath = path.join(process.cwd(), './logs');
        logger.init(logPath);
        logger.info('------------------------------------------------------------');
        logger.info('program start');
        logger.info('------------------------------------------------------------');
        this.app.listen(config.server.port, () => {
            logger.info('start server');
        });
    }
}

export default Server;