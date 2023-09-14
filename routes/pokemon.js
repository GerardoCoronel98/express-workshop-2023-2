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
    // (id >= 0 && id <= 150) ?
    //     res.status(200).send(db[req.params.id - 1]) :
    //     res.status(404).send("Pokemon no encontrado");

    const pkmn = await db.query("SELECT pok_name FROM pokemon");
    return res.status(200).json(pkmn.pok_name);
});
/*
Se agrego el '.toUpperCase' para en caso de realizar la busqueda
se actualice a las mayusculas como guste el usuario.
*/
pokemon.get('/:name([A-Za-z]+)', (req, res, next) => {

    /* 
    condición ? valor si verdadero : valor si falso
    if si queremos que retorne algo
    */
    const name = req.params.name;

    const pkmn = db.filter((p) => {
        return (p.name.toUpperCase() == name.toUpperCase()) && p;
    });

    console.log(pk);

    (pkmn.length > 0) ?
        res.status(200).send(pkmn) :
        res.status(404).send("Pokemon no encontrado")
});

module.exports = pokemon;