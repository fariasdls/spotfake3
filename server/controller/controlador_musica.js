import { Artista } from "../db.js";

const getMusica = async (req, res) => {
    const info = req.body
    const receba = await Artista.findAll({ where: {nome: info.nome}})
    res.json(receba)
}

export { getMusica }