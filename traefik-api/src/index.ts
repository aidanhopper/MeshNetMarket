import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs/promises';

const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) throw new Error('Unauthorized');
        if (token !== process.env.TRAEFIK_API_TOKEN) throw new Error('Unauthorized');
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Unauthorized' });
    }
}

app.post('/', authenticate, async (req: Request, res: Response) => {
    try {
        console.log('POST /');
        if (!req.body) throw new Error('Request requires body');
        await fs.writeFile('dynamic.json', JSON.stringify(req.body));
        res.status(201).json({ message: 'Success' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

app.get('/', authenticate, async (req: Request, res: Response) => {
    try {
        console.log('GET /');
        const data = JSON.parse(await fs.readFile('dynamic.json', { encoding: 'utf-8' }));
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

app.listen(port, () => {
    console.log(`traefik-api running on port ${port}`);
});
