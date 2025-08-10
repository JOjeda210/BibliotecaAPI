// booksRoutes.js
const express = require('express');
const booksController = require('../controllers/booksController.js');
const router = express.Router(); 

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - titulo
 *         - autor
 *         - isbn
 *         - year
 *         - genero
 *         - stock
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del libro (generado automáticamente)
 *           example: 1
 *         titulo:
 *           type: string
 *           description: Título del libro
 *           example: "Cien años de soledad"
 *         autor:
 *           type: string
 *           description: Autor del libro
 *           example: "Gabriel García Márquez"
 *         isbn:
 *           type: string
 *           description: Código ISBN del libro
 *           example: "978-84-376-0494-7"
 *         year:
 *           type: integer
 *           description: Año de publicación
 *           example: 1967
 *         genero:
 *           type: string
 *           description: Género literario del libro
 *           example: "Realismo mágico"
 *         stock:
 *           type: integer
 *           description: Cantidad disponible en inventario
 *           example: 5
 *     BookInput:
 *       type: object
 *       required:
 *         - titulo
 *         - autor
 *         - isbn
 *         - year
 *         - genero
 *         - stock
 *       properties:
 *         titulo:
 *           type: string
 *           description: Título del libro
 *           example: "Cien años de soledad"
 *         autor:
 *           type: string
 *           description: Autor del libro
 *           example: "Gabriel García Márquez"
 *         isbn:
 *           type: string
 *           description: Código ISBN del libro
 *           example: "978-84-376-0494-7"
 *         year:
 *           type: integer
 *           description: Año de publicación
 *           example: 1967
 *         genero:
 *           type: string
 *           description: Género literario del libro
 *           example: "Realismo mágico"
 *         stock:
 *           type: integer
 *           description: Cantidad disponible en inventario
 *           example: 5
 *     Error:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           description: Mensaje de error
 *           example: "Error del servidor"
 */

/**
 * @swagger
 * /libros:
 *   get:
 *     summary: Obtiene todos los libros
 *     description: Retorna una lista completa de todos los libros disponibles en la biblioteca
 *     tags: [Libros]
 *     responses:
 *       200:
 *         description: Lista de libros obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', booksController.getalllibros);

/**
 * @swagger
 * /libros:
 *   post:
 *     summary: Crea un nuevo libro
 *     description: Añade un nuevo libro a la biblioteca
 *     tags: [Libros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookInput'
 *     responses:
 *       201:
 *         description: Libro creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Error de validación - campos requeridos faltantes o inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               msg: "Todos los campos son obligatorios"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', booksController.createbook);

/**
 * @swagger
 * /libros/{id}:
 *   put:
 *     summary: Actualiza un libro existente
 *     description: Actualiza todos los campos de un libro específico por su ID
 *     tags: [Libros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único del libro a actualizar
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookInput'
 *     responses:
 *       200:
 *         description: Libro actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Error de validación - campos requeridos faltantes o inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               msg: "Todos los campos son obligatorios"
 *       404:
 *         description: Libro no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               msg: "El libro para actualizar no existe"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', booksController.updatelibro);

/**
 * @swagger
 * /libros/{id}:
 *   delete:
 *     summary: Elimina un libro
 *     description: Elimina un libro específico de la biblioteca por su ID
 *     tags: [Libros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único del libro a eliminar
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: Libro eliminado exitosamente (sin contenido)
 *       404:
 *         description: Libro no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               msg: "El libro para eliminar no existe"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', booksController.deletelibro);

module.exports = router;