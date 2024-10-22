const sql = require('mssql');

const config = {

    server: 'DESKTOP-NLHRF2R\\SQLEXPRESS',
    database: 'library_db',
    options: {
        encrypt: true,
        trustServerCertificate: true,
        authentication: { type: 'ntlm' }
    },
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Conectado a SQL Server');
        return pool;
    })
    .catch(err => console.log('Error de conexión: ', err));

module.exports = {
    sql,
    poolPromise,
};
