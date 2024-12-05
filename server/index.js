import Express from "express";
// import { criarTabelas } from "db.js" ;
import cors from 'cors'
import { rotas } from './routes/rotas_autenticacao.js'
import { rotas_users } from './routes/rotas_users.js';
import { rotas_musica } from './routes/rotas_musica.js';


const app = Express()
app.use(Express.json())
app.use(cors())
// criarTabelas()

app.use('/autenticacao', rotas)
app.use('/usuarios', rotas_users)
app.use('/musica', rotas_musica)

app.listen(8000)