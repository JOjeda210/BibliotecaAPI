const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0', // Versión de OpenAPI
    info: {
      title: 'API de Gestión de Libros - Biblioteca',
      version: '1.0.0',
      description: 'Una API RESTful completa para gestionar una colección de libros en una biblioteca. Incluye operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para el manejo de libros con validaciones y manejo de errores.',
      contact: {
        name: 'Jesus Osbaldo Ojeda Aké - Backend Developer',
        email: 'ojedajesus232@gmail.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1', // La URL base de tu API
        description: 'Servidor de desarrollo'
      },
    ],
    tags: [
      {
        name: 'Libros',
        description: 'Operaciones relacionadas con la gestión de libros'
      }
    ]
  },
  apis: ['./src/routes/*.js'], // Ruta a los archivos donde están tus endpoints (controladores)
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;