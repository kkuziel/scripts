import express, { Request, Response } from 'express';
import { logRequest } from './middleware';

class Server {
  private app = express();

  constructor() {
    this.app.use(logRequest);

    // Defining the route directly in the constructor
    this.app.get('/health', this.healthCheck);

    this.app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  }

  private healthCheck(req: Request, res: Response): void {
    res.status(200).send('OK');
  }
}

new Server();
