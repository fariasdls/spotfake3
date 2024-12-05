import { User } from '../db.js'
import bcryptjs from 'bcryptjs'

const listUser = async (req, res) => {
    const receba = await User.findAll({ attributes: ['nome','email','status']})
    console.log(receba)
    res.send(receba)
}

const getUser = async (req, res) => {
    const info = req.body;
    const receba = await User.findOne({ where: { email: info.email }, attributes: ['nome', 'sobrenome', 'email', 'status', 'dataNascimento', 'foto'] })
    res.send(receba)
}

const deleteUser = async (req, res) => {
    const { id } = req.body;
    const receba = await User.findOne({ where: { id: id }})
    if (!receba) {
        return res.send('Esse User ai nao existe')
    }
    const apaga = await User.destroy({where: {id: id}})
}

const trocaSenha = async (req, res) => {
    const info = req.body;
    const receba = await User.findOne({ where: {email: info.email} });
    if (!receba) {
        return res.send('Esse User ai nao existe')
    }
    const senhacrypt = bcryptjs.hashSync(info.senha, 10)
    const atualiza = await User.update({ senha: senhacrypt}, {where: {email: info.email}})
    res.send('Atualizou')
}

const salvarFoto = async ( req, res) => {
    const info = req.body;
    const receba = await User.findOne({ where: {email: info.email}});
    if (!receba) {
        return res.send('Esse User ai nao existe')
    };
    const atualiza = await User.update({ foto: info.foto}, { where: {email: info.email}})
    res.send('Postou')
}

export { listUser, deleteUser, getUser, trocaSenha, salvarFoto }