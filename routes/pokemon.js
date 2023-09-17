const express = require('express');
const pokemon = express.Router();
const db = require('../config/database')

pokemon.post('/', (req, res, next) => {
    return res.status(200).send(req.body);
});
//Al poner los ":" se genera una variable y un enlace
//a una dirección que desinga el usuario
pokemon.get('/', async (req, res, next) => {
    const pkmn = await db.query("SELECT * FROM pokemon");
    return res.status(200).json(pkmn);

});

pokemon.get('/:id([0-9]{1,3})', async (req, res, next) => {

    // const id = req.params.id - 1;
    // if (id >= 0 && id <= 150) {
    //     return res.status(200).send(pk[req.params.id - 1]);
    // }
    // return res.status(404).send("Pokemon no encotnrado")
    try {
        const id = req.params.id - 1;
        if (id >= 0 && id <= 721) {
            const pokemonid = await db.query("SELECT pok_name, pok_id FROM pokemon")
            return res.status(200).json(pokemonid[req.params.id - 1])
        }
        return res.status(404).send("Pokemon no encontrado")
    } catch (error) {
        next(error)
    }
});
/*
Se agrego el '.toUpperCase' para en caso de realizar la busqueda
se actualice a las mayusculas como guste el usuario.
*/
pokemon.get('/:name([A-Za-z]+)', async (req, res, next) => {
    try {
        const name = req.params.name;
        const pkmn = await db.query("SELECT pok_name FROM pokemon WHERE pok_name = ?", [name])
        if (pkmn.length > 0) {
            return res.status(200).json({ name: pkmn[0].pok_name });
        }
        return res.status(404).send("pokemon no econtrado")

    } catch (error) {
        next(error)
    }


})

module.exports = pokemon;


