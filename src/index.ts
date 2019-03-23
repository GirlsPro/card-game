import Express from 'express';
import Path from 'path';
import BodyParser from 'body-parser';
import { gameRouter } from './routes/game';

const rootPath = Path.resolve(__dirname, '..');
process.chdir(rootPath);

const app = Express();
app.listen(8000);

app.use(BodyParser.json());
app.use(Express.static(Path.resolve(rootPath, 'public')));

app.use('/api', gameRouter);
