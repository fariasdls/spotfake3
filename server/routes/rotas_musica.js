import Express from "express";
import { getMusica } from "../controller/controlador_musica.js";

const rotas_musica = Express.Router()

rotas_musica.post('/listM', getMusica);

export { rotas_musica }
