import express = require('express');
import dotenv = require('dotenv');
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');

import { Request, Response } from 'express';
import * as config from './config';

/**
 * The base Express Application
 */
export class AppServer {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.configApp();
        this.defineRoutes();
        this.listen();
    }

    /**
     * Returns the express application instance.
     */
    public getApp = (): express.Application => this.app;

    /**
     * Setup the express application's body parser info. You could add a view engine here as well.
     */
    private configApp(): void {
        this.app.use(cookieParser());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true}));
        
    }

    /**
     * Define the routes used in the application
     */
    private defineRoutes(): void {
        const router: express.Router = express.Router();

        router.get('/', (req: Request, res: Response) => {
            res.send('hello world');
        });

        router.get('/api/users', (req: Request, res: Response) => {
            res.json([{
                id: 1,
                name: 'Joe Tester'
            },{
                id: 2,
                name: 'Jane Tester'
            }]);
        });

        this.app.use('/', router);
    }

    /**
     * Start the node.js server
     */
    private listen(): void {
          this.app.listen(config.port, () => {
            console.log('server started at http://localhost:'+config.port);
            console.log(process.env.NODE_ENV);
          });
    }
}
