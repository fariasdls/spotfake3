import Express from 'express';
import { User, criarTabelas } from './db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = Express();
app.use(Express.json());
app.use(cors());

 

app.post('/registro', async function (req, res) {
    try {
        const { nome, sobrenome, email, senha, dataNascimento } = req.body;

        if (!nome || !sobrenome || !email || !senha || !dataNascimento) {
            res.status(406).send('todos os campos devem ser preenchidos');
            return;
        }
        if (await User.findOne({ where: { email: email } })) {
            res.status(400).send('usuario ja cadastrado');
            return;
        }
        const senhaSegura = bcrypt.hashSync(senha, 10);

        await User.create({
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            senha: senhaSegura,
            dataNascimento: dataNascimento,
        });

        res.status(201).send('  Ok ! Usuário criado');
    } catch (erro) {
        console.error(erro);
        res.status(500).send('Erro interno no servidor');
    }
});

app.post('/login', async function (req, res) {
    try {
        const { email, senha } = req.body;
        if (!email || !senha) {
            res.status(406).send('todos os campos devem ser preenchidos');
            return;
        }
        const usuario = await User.findOne({ where: { email: email } });
        if (!usuario) {
            res.status(404).send('este usuario não está cadastrado');
            return;
        }
        const senhaCorreta = bcrypt.compareSync(senha, usuario.senha);
        if (!senhaCorreta) {
            res.status(403).send('senha incorreta');
            return;
        }
        const token = jwt.sign(
            {
                nome: usuario.nome,
                email: usuario.email,
                status: usuario.status
            },
            'chavecriptografiasupersegura',
            {
                expiresIn: "30d"
            }
        );

        res.status(200).json({ msg: 'voce foi logado', token: token });
    } catch (erro) {
        console.error(erro);
        res.status(500).send('houve um problema');
    }
});

app.post('/trocar_senha/:email', async function (req, res) {
    const { senha } = req.body
        const { email } = req.params
        try {
            if (!senha) {
                res.status(400).send('o campo deve ser preenchido')
                return
            }
    
            const usuario = await User.findOne({ where: { email: email } })
    
            if (!usuario) {
                res.status(404).send('usuario não encontrado')
                return
            }
    
            const senhaSegura = bcrypt.hashSync(senha, 10);
            await usuario.update({ senha: senhaSegura });
            res.status(200).send('senha alterada com sucesso')
        } catch(error) {
            console.log(error)
            res.status(500).send('erro no servidor')
        }
    }
)

app.listen(8000, () => {
    console.log('Servidor rodando na porta 8000');
});