const express = require('express');
const app = express();
const { pokemon } = require('./pokedex.json');

app.get("/", (req, res, next) => {
    res.status(200);
    res.send("Bienvenido al Pokedex");
});
//Al poner los ":" se genera una variable y un enlace
//a una dirección que desinga el usuario
app.get('/pokemon', (req, res, next) => {
    res.status(200);
    res.send(pokemon);

});

app.get('/pokemon/:id', (req, res, next) => {
    res.status(200);
    res.send(pokemon[req.params.id - 1]);
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running...');
});