const { poolPromise } = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const pool = await poolPromise;
        await pool.request()
            .input('username', username)
            .input('password', hashedPassword)
            .query('INSERT INTO users (username, password) VALUES (@username, @password)');
        res.status(201).send('Usuario registrado.');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('username', username)
            .query('SELECT * FROM users WHERE username = @username');

        if (result.recordset.length === 0) return res.sendStatus(401);

        const user = result.recordset[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.sendStatus(401);

        const token = jwt.sign({ id: user.id }, 'secret_key', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { registerUser, loginUser };