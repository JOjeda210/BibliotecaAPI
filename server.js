require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const superbase = require('./config/db'); 
const PORT = process.env.PORT || 5000;


app.get('/', (req, res) => {
    res.send('¡Hola, mundo! La aplicación de biblioteca está funcionando correctamente .');
})









app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});

