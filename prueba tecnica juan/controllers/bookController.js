const { poolPromise } = require('../config/db');

const getBooks = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM books');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const createBook = async (req, res) => {
    const { title, author, year, status } = req.body;
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('title', title)
            .input('author', author)
            .input('year', year)
            .input('status', status)
            .query('INSERT INTO books (title, author, year, status) VALUES (@title, @author, @year, @status)');
        res.status(201).send('Libro creado.');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Agregar otras funciones para actualizar y eliminar libros

module.exports = { getBooks, createBook };