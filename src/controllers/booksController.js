
const superbase = require('../config/db'); 
const BookService = require('../services/bookService')

// LOS CONTROLADORES SE ENCARGAN DE RECIBIR LAS SOLICITUDES DE LAS RUTAS 
// LA RUTA HACE LA PETICIÓN AL CONTROLLER SEGÚN EL VERBO HTTP Q CORRESPONDA 
// LOS SERVICIOS SE ENCARGAN DE APLICAR TODA LA LÓGICA DE NEGOCIO COMO LO SON CONSULTAS, VALIDACIONES, FORMATEO DE DATA, ETC



// ENDPOINTS

// TRAE TODOS LOS LIBROS1
exports.getalllibros =  async (req,res) => {
   try{   
     const {data, error} =  await BookService.getAllLibros();
     

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
    // Campos obligatorios no vacíos/nulos
    const {data, error} = await BookService.createBook(req.body)
     // Dentro de exports.createbook
    if (error) 
    {
      if (error.message.includes('Todos los campos son obligatorios') || error.message.includes('deben ser números')) {
        // Error de validación de cliente
        return res.status(400).json({ msg: error.message });
      }
      // Para cualquier otro tipo de error que provenga del servicio (ej. error de Supabase)
      return res.status(500).json({ msg: 'Error al crear el libro: ' + error.message });
    } 
    res.status(201).json(data)
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
      const {data, error} = await BookService.updateBook(id, req.body)
      if(error) 
      {
        if (error.message.includes('Todos los campos son obligatorios') || error.message.includes('deben ser números'))
        {
          return res.status(400).json({ msg: error.message });
        }
        else if (error.message.includes('El libro para actualizar no existe')) 
        {
          return res.status(404).json({ msg: error.message });
        }
        // Cualquier otro error, incluyendo errores de base de datos (Supabase)
        else 
        {
          return res.status(500).json({ msg: 'Error al actualizar el libro: ' + error.message });
        }
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
    const {data,error} = await BookService.deleteBook(id);
    if(error) 
      {
        if (error.message.includes('El libro para eliminar no existe')) 
        {
          return res.status(404).json({ msg: error.message });
        }
        // Cualquier otro error, incluyendo errores de base de datos (Supabase)
        else 
        {
          return res.status(500).json({ msg: 'Error al actualizar el libro: ' + error.message });
        }
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
