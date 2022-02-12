import * as express from 'express'
import {Api} from './api/api'
export class Index {
    private static instance: Index = undefined;
    private app: express.Application = undefined;
    private apiRouter: Api;    
    constructor(){
        this.apiRouter = new Api();
    }
    static getInstance(){
        if(!Index.instance){
            Index.instance = new Index();
        }
        return Index.instance;
    }
    setRoute(app: express.Application){
        this.app = app;
        this.app.use('/api', this.apiRouter.getRoute());
    }
}