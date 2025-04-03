import express from 'express';
import bodyParser from 'body-parser';
import pool from './db.js';

const app = express();

app.use(bodyParser.json())

async function createTable() {
    try {
        await pool.query(`CREATE TABLE lists (
            id INTEGER AUTO_INCREMENT,
            value TEXT,
            PRIMARY KEY (id)
        )`)
        console.log('테이블 생성 완료');
    } catch (error) {
        console.log(error)
    }
}
createTable();

app.get('/api/values', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM lists');
        return res.json(rows);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
/*
    await db.pool.query('SELECT * FROM lists;', (err, results, fields) => {
        if (err) {
            console.log(err)
            return res.status(500).send(err);
        }
        return res.json(results);
    })
    */
})

app.post('api/value', async (req, res, next) => {

    try {
        const [rows] = await pool.query(`INSERT INTO lists (value) VALUES ("${req.body.value}")`);
        return res.json({ success: true, value: req.body.value });
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
    /*
    await db.pool.query(`INSERT INTO lists (value) VALUES ("${req.body.value}")`, (err, results, fields) => {
        if (err) {
            console.log(err)
            return res.status(500).send(err);
        }
        return res.json({ success: true, value: req.body.value });
    });
    */
})

app.listen(5000, () => {
    console.log('5000번 포트에서 앱이 실행되었습니다.');
})