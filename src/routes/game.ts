import { Router, IRouter } from 'express';
import { Game } from '../game';

const gameRouter: IRouter<object> = Router();

gameRouter.get('/init', (_req, res) => {
    res.send({
        playersIds: Game.init()
    });
});

gameRouter.get('/round', (_req, res) => {
    const data = {
        ...Game.round(),
        ...Game.isGameOver()
    };
    console.log(data);
    res.send(data);
});

export { gameRouter };
