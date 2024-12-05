import Express from "express";
import { registro, login } from '../controller/controlador_autenticacao.js'

const rotas = Express.Router()

rotas.post('/registro', registro);
rotas.post('/login', login);

export { rotas }
