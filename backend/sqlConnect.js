import mysql from 'mysql';

export const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'my',
});

con.connect((err) => {
    if (err) {
        throw err;
    }

    console.log('DB Connected');
});
