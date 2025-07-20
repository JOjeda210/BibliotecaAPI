// DEPENDENCIAS O LIBRERIAS DEL PROYECTO
require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const superbase = require('./config/db'); 

// PUERTO
const PORT = process.env.PORT || 5000;

// ENDPOINTS
app.get('/', (req, res) => {
    res.send('¡Hola, mundo! La aplicación de biblioteca está funcionando correctamente .');
})

app.get('/api/v1/libros', async (req,res) => {
   try{
    // USAMOS SENTENCIAS SQL
     const books =  await superbase.from('libros').select('*')
     res.status(200).json(books);
   } 
   catch (error){
     // Imprime el error en la consola del servidor
        console.error(error.message); 
        // Indica el stats code del error
        res.status(500).json({ msg: 'Error del servidor: ' + error.message });

   }

});

app.post('/api/v1/libros',async (req,res) => {
  try
  {
    const { titulo, autor, isbn, year, genero, stock } = req.body;
    const updateBooks = await superbase
    .from('libros')
    .insert([
      {
        titulo: titulo,
        autor: autor,
        isbn: isbn,
        year: year,
        genero: genero,
        stock: stock,
      }  
       
      
    ])
    
    res.status(201).json(updateBooks)
  }
  catch(error)
  {
    // Imprime el error en la consola del servidor
    console.error(error.message); 
    // Indica el stats code del error
    res.status(500).json({ msg: 'Error del servidor: ' + error.message });

  }


});





// PUERTO ESCUCHANDO
app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});

