
const superbase = require('../config/db'); 
// LOS CONTROLADORES SE ENCARGAN DE RECIBIR LAS SOLICITUDES DE LAS RUTAS 
// LA RUTA HACE LA PETICIÓN AL CONTROLLER SEGÚN EL VERBO HTTP Q CORRESPONDA 



// ENDPOINTS

// TRAE TODOS LOS LIBROS1
exports.getalllibros =  async (req,res) => {
   try{
    // USAMOS SENTENCIAS SQL
     const {data, error} =  await superbase
     .from('libros')
     .select('*')

      if(error)
      {
        res.status(500).json({ msg: 'Error del servidor: ' + error.message });

      }
     res.status(200).json(data);
   } 
   catch (error){
     // Imprime el error en la consola del servidor
        console.error(error.message); 
        // Indica el stats code del error
        res.status(500).json({ msg: 'Error del servidor: ' + error.message });

   }

};
// CREA UN NUEVO LIBROL
exports.createbook = async (req,res) => {
  try
  {
    const { titulo, autor, isbn, year, genero, stock } = req.body;
    const {createBooks,error} = await superbase
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
      if(error)
      {
        res.status(500).json({ msg: 'Error del servidor: ' + error.message });

      }
    res.status(201).json(createBooks)
  }
  catch(error)
  {
    // Imprime el error en la consola del servidor
    console.error(error.message); 
    // Indica el stats code del error
    res.status(500).json({ msg: 'Error del servidor: ' + error.message });

  }


};

// ACTUALIZA UN LIBRO 
exports.updatelibro =  async (req,res) => {
    try
    {
      // instanciamiento del id pq por id buscamos para la actualización de todos los campos
      const {id} = req.params; 
      const {titulo, autor, isbn, year, genero, stock } = req.body;
      // Data antes era updateBook, esto se hace para poder controlar mejor los errores
      const {data,error} = await superbase
      .from('libros') 
      .update({ // funcion del cliente de superbase para actualizar
        // Instanciamiento de datos 
          titulo: titulo,
          autor: autor,
          isbn: isbn,
          year: year,
          genero: genero,
          stock: stock,
      })
      .eq('id', id)
      .select();
      // validaciones
      if (error)
      {
        res.status(500).json({ msg: 'Error del servidor: ' + error.message }); 
      }
      else if (data.length)
      {
         
         return res.status(400).json({msg: 'Libro no encontrado'})
      }
      // si todo está bien, regresa un 200 OK
      res.status(200).json(data);




    }

    catch (error)
    {
      // CONTROL DE ERRORES 
      console.error(error.message);
      res.status(500).json({ msg: 'Error del servidor: ' + error.message });
    }

}; 

// Eliminar un libro
exports.deletelibro = async(req,res) =>{
  try
  {
    const {id} = req.params; 
    const {data,error} = await superbase
    .from('libros')
    .delete()
    .eq('id', id);

    if(error)
    {
       res.status(500).json({ msg: 'Error del servidor: ' + error.message });
      
    }
    else if (data.length === 0)
    {
     return res.status(404).json({msg : 'El libro no se puede eliminar porque no ha sido encontrado'})
    }
     // si todo está bien, regresa un 204 NO CONTENT OK
    res.status(204).send();
  }
  catch (error)
  {
    console.error(error.message);
    res.status(500).json({ msg: 'Error del servidor: ' + error.message });
  }

};
