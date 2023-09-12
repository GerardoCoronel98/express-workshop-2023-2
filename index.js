const express = require('express');
const app = express();
const { pokemon } = require('./pokedex.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
GET - Obtener recursos
POST - Almacenar/Crear recursos
PUT - Modificar una parte de un recruso
PATCH - Modificar un recruso
DELETE - Borrar un recurso
 */
app.get("/", (req, res, next) => {
    //res es simplemnte la respuesta del servidor ligado a los códigos
    //de http, en caso 200 es que todo salio bien, en caso 404 respuesta de error
    return res.status(200).send("Bienvenido al Pokedex");
});


app.post('/pokemon', (req, res, next) => {
    return res.status(200).send(req.body);
});
//Al poner los ":" se genera una variable y un enlace
//a una dirección que desinga el usuario
app.get('/pokemon', (req, res, next) => {
    return res.status(200).send(pokemon);

});

app.get('/pokemon/:id([0-9]{1,3})', (req, res, next) => {

    const id = req.params.id - 1;
    (id >= 0 && id <= 150) ?
        res.status(200).send(pokemon[req.params.id - 1]) :
        res.status(404).send("Pokemon no encontrado");
});

/*
Se agrego el '.toUpperCase' para en caso de realizar la busqueda
se actualice a las mayusculas como guste el usuario.
*/
app.get('/pokemon/:name([A-Za-z]+)', (req, res, next) => {

    /* 
    condición ? valor si verdadero : valor si falso
    if si queremos que retorne algo
    */
    const name = req.params.name;
    const pk = pokemon.filter((p) => {
        return (p.name.toUpperCase() == name.toUpperCase()) && p;
    });

    console.log(pk);

    (pk.length > 0) ?
        res.status(200).send(pk) :
        res.status(404).send("Pokemon no encontrado")
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running...');
});