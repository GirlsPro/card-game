import { Router, IRouter } from 'express';
import { Game } from '../game';

const gameRouter: IRouter<object> = Router();

gameRouter.get('/init', (_req, res) => {
    res.send({
        playersIds: Game.init()
    });
});

gameRouter.get('/round', (_req, res) => {
    res.send({
        ...Game.round(),
        ...Game.isGameOver()
    });
});

export { gameRouter };
