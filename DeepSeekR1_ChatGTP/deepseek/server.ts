import express from 'express';
import { logMiddleware } from './logging-middleware';

class Server {
    private app: express.Express;

    constructor() {
        this.app = express();
        this.app.use(logMiddleware);
    }

    public defineHealthRoute(): void {
        this.app.get('/health', (req: express.Request, res: express.Response) => {
            res.sendStatus(200);
        });
    }

    public listen(port: number): void {
        const server = this.app.listen(port, () => {
            console.log('Server is running on port 3000');
        });
    }
}

const serverInstance = new Server();
serverInstance.defineHealthRoute();
serverInstance.listen(3000);