const express = require('express');
const app = express();
const pokemon = require('./routes/pokemon');
const morgan = require('morgan');

app.use(morgan('dev'));
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

app.use('/pokemon', pokemon);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running...');
});