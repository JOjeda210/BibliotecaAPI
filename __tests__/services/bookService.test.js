// Importa el servicio que contiene las funciones a probar
const bookService = require('../../src/services/bookService');

// Importa la instancia de Supabase (que queremos mockear)
const superbase = require('../../src/config/db');

// Mockea el módulo de Supabase para que no se conecte a la BD real
jest.mock('../../src/config/db');

// 'describe' agrupa las pruebas para un módulo
describe('bookService', () => {

    // Limpia los mocks antes de cada prueba para evitar que una afecte a otra
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // -----------------------------------------------------------
    // PRUEBAS PARA getAllLibros()
    // -----------------------------------------------------------

    test('getAllLibros debería devolver una lista de libros si la llamada a Supabase es exitosa', async () => {
        // ARRANGE
        const mockLibros = [
            { id: 'uuid-1', titulo: 'Libro Uno', autor: 'Autor Uno' },
            { id: 'uuid-2', titulo: 'Libro Dos', autor: 'Autor Dos' }
        ];
        const mockError = null;
        superbase.from.mockReturnValue({
            select: jest.fn().mockResolvedValue({ data: mockLibros, error: mockError })
        });

        // ACT
        const { data, error } = await bookService.getAllLibros();

        // ASSERT
        expect(error).toBeNull();
        expect(data).toEqual(mockLibros);
        expect(superbase.from).toHaveBeenCalledWith('libros');
        expect(superbase.from().select).toHaveBeenCalledTimes(1);
    });

    test('getAllLibros debería devolver un error si la llamada a Supabase falla', async () => {
        // ARRANGE
        const mockData = null;
        const mockError = { message: 'Mensaje de error simulado de Supabase' };
        superbase.from.mockReturnValue({
            select: jest.fn().mockResolvedValue({ data: mockData, error: mockError })
        });

        // ACT
        const { data, error } = await bookService.getAllLibros();

        // ASSERT
        expect(data).toBeNull();
        expect(error).toEqual(mockError);
        expect(superbase.from).toHaveBeenCalledWith('libros');
        expect(superbase.from().select).toHaveBeenCalledTimes(1);
    });

    // -----------------------------------------------------------
    // PRUEBAS PARA createBook()
    // -----------------------------------------------------------

    test('createBook debería añadir un nuevo libro si los datos son válidos', async () => {
        // ARRANGE
        // Datos completos para pasar la validación
        const bookData = {
            titulo: 'Libro Test',
            autor: 'Autor Test',
            isbn: '1234567890123',
            year: 2023,
            genero: 'Ficción',
            stock: 10
        };
        const mockCreatedBook = [{ ...bookData, id: 'uuid-creado' }];
        superbase.from.mockReturnValue({
            insert: jest.fn().mockReturnValue({
                select: jest.fn().mockResolvedValue({ data: mockCreatedBook, error: null })
            })
        });

        // ACT
        const { data, error } = await bookService.createBook(bookData);

        // ASSERT
        expect(error).toBeNull();
        expect(data).toEqual(mockCreatedBook);
        expect(superbase.from).toHaveBeenCalledWith('libros');
        expect(superbase.from().insert).toHaveBeenCalledWith([bookData]);
    });

    test('createBook debería devolver un error si la llamada a Supabase falla', async () => {
        // ARRANGE
        const bookData = {
            titulo: 'Libro Test',
            autor: 'Autor Test',
            isbn: '1234567890123',
            year: 2023,
            genero: 'Ficción',
            stock: 10
        };
        const mockError = { message: 'Error de inserción en la BD' };
        superbase.from.mockReturnValue({
            insert: jest.fn().mockReturnValue({
                select: jest.fn().mockResolvedValue({ data: null, error: mockError })
            })
        });

        // ACT
        const { data, error } = await bookService.createBook(bookData);

        // ASSERT
        expect(data).toBeNull();
        expect(error).toEqual(mockError);
    });

    // -----------------------------------------------------------
    // PRUEBAS PARA updateBook()
    // -----------------------------------------------------------

    test('updateBook debería actualizar un libro existente si el ID es válido', async () => {
        // ARRANGE
        const bookId = 'uuid-1';
        // Datos completos para pasar la validación
        const bookData = {
            titulo: 'Titulo Editado',
            autor: 'Autor Test',
            isbn: '1234567890123',
            year: 2023,
            genero: 'Ficción',
            stock: 10
        };
        const mockUpdatedBook = [{ ...bookData, id: bookId }];
        superbase.from.mockReturnValue({
            update: jest.fn().mockReturnValue({
                eq: jest.fn().mockReturnValue({
                    select: jest.fn().mockResolvedValue({ data: mockUpdatedBook, error: null })
                })
            })
        });

        // ACT
        const { data, error } = await bookService.updateBook(bookId, bookData);

        // ASSERT
        expect(error).toBeNull();
        expect(data).toEqual(mockUpdatedBook);
        expect(superbase.from).toHaveBeenCalledWith('libros');
        expect(superbase.from().update).toHaveBeenCalledWith(bookData);
        expect(superbase.from().update().eq).toHaveBeenCalledWith('id', bookId);
    });

    test('updateBook debería devolver un error 404 si el libro no se encuentra', async () => {
        // ARRANGE
        const bookId = 'id-no-existente';
        // Datos completos para pasar la validación y llegar al mock
        const bookData = {
            titulo: 'Titulo Editado',
            autor: 'Autor Test',
            isbn: '1234567890123',
            year: 2023,
            genero: 'Ficción',
            stock: 10
        };
        superbase.from.mockReturnValue({
            update: jest.fn().mockReturnValue({
                eq: jest.fn().mockReturnValue({
                    select: jest.fn().mockResolvedValue({ data: [], error: null }) // data es un array vacío
                })
            })
        });

        // ACT
        const { data, error } = await bookService.updateBook(bookId, bookData);

        // ASSERT
        expect(data).toBeNull();
        // El mensaje de error esperado ahora coincide con la lógica del servicio
        expect(error).toEqual({ message: 'Libro no encontrado' });
    });

    // -----------------------------------------------------------
    // PRUEBAS PARA deleteBook()
    // -----------------------------------------------------------

    test('deleteBook debería eliminar un libro si el ID es válido', async () => {
        // ARRANGE
        const bookId = 'uuid-1';
        const mockDeletedData = [{ id: bookId }]; // Supabase retorna el item eliminado
        superbase.from.mockReturnValue({
            delete: jest.fn().mockReturnValue({
                eq: jest.fn().mockReturnValue({
                    select: jest.fn().mockResolvedValue({ data: mockDeletedData, error: null })
                })
            })
        });

        // ACT
        const { data, error } = await bookService.deleteBook(bookId);

        // ASSERT
        expect(error).toBeNull();
        expect(data).toEqual(mockDeletedData);
        expect(superbase.from).toHaveBeenCalledWith('libros');
        expect(superbase.from().delete).toHaveBeenCalled();
        expect(superbase.from().delete().eq).toHaveBeenCalledWith('id', bookId);
    });

    test('deleteBook debería devolver un error 404 si el libro no existe', async () => {
        // ARRANGE
        const bookId = 'id-no-existente';
        superbase.from.mockReturnValue({
            delete: jest.fn().mockReturnValue({
                eq: jest.fn().mockReturnValue({
                    select: jest.fn().mockResolvedValue({ data: [], error: null })
                })
            })
        });

        // ACT
        const { data, error } = await bookService.deleteBook(bookId);

        // ASSERT
        expect(data).toBeNull();
        // Mensaje de error ajustado para que coincida con el servicio
        expect(error).toEqual({ message: 'El libro para eliminar no existe' });
    });
});