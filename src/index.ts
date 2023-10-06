import { app } from './app';
import * as process from 'process';

/**
 * App bootstrap
 *
 
 */

const port = process.env.PORT ?? 5000;

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`));
