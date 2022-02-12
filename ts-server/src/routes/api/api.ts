import * as express from 'express';
import {Logger} from '../../util/logger'

let logger: Logger = Logger.getInstance();
export class Api {
    private router: express.Router = express.Router();
    constructor(){
        this.setRoute();
    }
    getRoute(): express.Router {
        return this.router;
    }
    private setRoute(){
        this.router.use('/', this.test);
    }
    async test(req:express.Request, res:express.Response, next:express.NextFunction){
        res.send("Hello world");
    }
}