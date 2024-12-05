import bcryptjs from 'bcryptjs'
import { User } from '../db.js'
import jsonwebtoken from 'jsonwebtoken'

const registro = async (req, res) => {
}

const login = async (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(400).json({ error: 'tem que preencher tudo cabaço' });
    }

    const userExist = await User.findOne({ where: { email: email } });
    if (!userExist) {
        return res.status(404).json({ error: 'Esse Usuario Não Existe' });
    }

    const senhaValida = bcryptjs.compareSync(senha, userExist.senha);
    if (!senhaValida) {
        return res.status(401).json({ error: 'Senha invalida' });
    }

    const token = jsonwebtoken.sign(
        {
            "nome_completo": `${userExist.nome} ${userExist.sobrenome}`,
            "email": userExist.email,
            "status": userExist.status
        },
        'chavecriptografiajwt',
        { expiresIn: '5m' }
    );

    res.json({
        msg: "Usuario Logado",
        tokenJWT: token
    });

}

export { registro, login }