import express from 'express';

export function logMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log('Before:', req.url);
    const done = () => {
        console.log('After:', req.url);
    };
    res.once('finish', done);
    next();
}