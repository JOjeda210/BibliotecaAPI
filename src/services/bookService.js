const superbase = require('../config/db');  

async function getAllLibros (params) 
{
    const {data, error} =  await superbase
     .from('libros')
     .select('*')
    return {data, error};
}   

async function createBook (bookData)
{
        const { titulo, autor, isbn, year, genero, stock } = bookData; 
     // Campos obligatorios no vacíos/nulos
  if (!titulo || !autor || !isbn || !year || !genero || !stock || 
    isNaN(year) || typeof stock !== 'number' 
    ) 
    {
        return {
            data: null, // No hay datos exitosos
            error: { message: 'Todos los campos (titulo, autor, isbn, year, genero, stock) son obligatorios y deben tener un formato válido. "year" y "stock" deben ser números.' }
        };
    }

    const {data,error} = await superbase
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
    .select()
    return {data, error}
}   

async function updateBook (id,bookData) 
{
      const {titulo, autor, isbn, year, genero, stock } = bookData;
        // Campos obligatorios no vacíos/nulos
      if (!titulo || !autor || !isbn || !year || !genero || !stock || 
        isNaN(year) || typeof stock !== 'number' 
        ) 
        {
           return {
            data: null, // No hay datos exitosos
            error: { message: 'Todos los campos (titulo, autor, isbn, year, genero, stock) son obligatorios y deben tener un formato válido. "year" y "stock" deben ser números.' }
            };
        }

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
            return { data: null, error: { message: 'Error de base de datos: ' + error.message } };
       }   
   
      if (data.length === 0)
      {
        return{
            data: null, // No hay datos exitosos
            error: { message: 'El libro para actualizar no existe' }
        }
      }
            
    return {data,error}

    
}

async function deleteBook (id) 
{
    const {data,error} = await superbase
    .from('libros')
    .delete()
    .eq('id', id)
    .select();

    if(error)
    {
      return { data: null, error: { message: 'Error de base de datos: ' + error.message } };
      
    }
    else if (data.length === 0)
    {
      return{
            data: null, // No hay datos exitosos
            error: { message: 'El libro para eliminar no existe' }
        }
    }
    return {data, error}
}


module.exports = {
    getAllLibros,
    createBook,
    updateBook,
    deleteBook
}; 
