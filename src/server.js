// DEPENDENCIAS O LIBRERIAS DEL PROYECTO
require('dotenv').config();
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../docs/swagger');
app.use(express.json());
const superbase = require('./config/db'); 
const routerBooks = require('./routes/booksRoutes')

// PUERTO
const PORT = process.env.PORT || 5000;

app.use('/api/v1/libros', routerBooks);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// PUERTO ESCUCHANDO
app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});

