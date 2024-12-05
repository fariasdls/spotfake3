import Express from "express";
import { listUser, deleteUser, getUser, trocaSenha, salvarFoto } from "../controller/controlador_usuarios.js";

const rotas_users = Express.Router()

rotas_users.get('/lista', listUser);
rotas_users.delete('/deletar', deleteUser);
rotas_users.post('/receber', getUser)
rotas_users.put('/atualiza', trocaSenha)
rotas_users.put('/setfoto', salvarFoto)

export { rotas_users }