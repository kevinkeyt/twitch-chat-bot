import express = require('express');
import handlebars = require('express-handlebars');
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');
import { resolve as resolvePath } from 'path';

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
        this.app.engine('handlebars', handlebars());
        this.app.set('view engine', 'handlebars');
        this.app.set('views', resolvePath(`${__dirname}`, '../views'));
        this.app.use('/assets', express.static(resolvePath(`${__dirname}`, '../assets')));
        this.app.use('/client', express.static(resolvePath(`${__dirname}`, '../dist/client')));
    }

    /**
     * Define the routes used in the application
     */
    private defineRoutes(): void {
        const router: express.Router = express.Router();

        router.get('/', (req: Request, res: Response) => {
            res.render('index', { title: 'TTV Stream App'} );
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
