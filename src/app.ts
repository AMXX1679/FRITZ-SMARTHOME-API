import express, {type Application} from 'express';
import {routes} from './routes';

/**
 * Build and configure Express app
 *
 
 */

// Boot express
export const app: Application = express();

// Application routing
routes(app);
