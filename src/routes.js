import { Router } from 'express';
import MessageController from './app/controllers/MessageController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
// import authMiddleware from './middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

// Rota para buscar mensagens de acordo com o itemType
routes.get('/messages', MessageController.index); // Usando query params

routes.post('/messages', MessageController.store);

export default routes;
