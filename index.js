//Dependences 
const express = require('express');
const app = express();
const morgan = require('morgan');
//Routers
const pokemon = require('./routes/pokemon');
const user = require('./routes/user');
//Middleware
const auth = require('./middleware/auth')
const notFound = require('./middleware/notFound')
const index = require('./middleware/index')

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
//La lógica se lee en orden, es decir, primero lee pokemon y luego user
app.get('/', index);
app.use('/user', user);
app.use(auth)
app.use('/pokemon', pokemon);
app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running...');
});