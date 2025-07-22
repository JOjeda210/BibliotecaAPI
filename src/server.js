// DEPENDENCIAS O LIBRERIAS DEL PROYECTO
require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const superbase = require('./config/db'); 
const routerBooks = require('./routes/booksRoutes')

// PUERTO
const PORT = process.env.PORT || 5000;

app.use('/api/v1/libros', routerBooks);


// PUERTO ESCUCHANDO
app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});

