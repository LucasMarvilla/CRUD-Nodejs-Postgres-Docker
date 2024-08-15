import express from 'express';
import CarroControllers from './controllers/CarroControllers.js'; // Certifique-se de incluir a extensão .js

export const routes = express.Router();
routes.get('/carros', CarroControllers.buscarTodos)
routes.get('/result-page/:codigo', CarroControllers.buscarUm)
routes.post('/submit-form', CarroControllers.inserir)
routes.put('/carro/:codigo', CarroControllers.alterar)
routes.delete('/carro/:codigo', CarroControllers.excluir)