const express = require('express')
const cors = require('cors')
const mysql = require('mysql2/promise')
const config = require('./config')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const port = 3001

app.get("/new",async function (req,res) {
    try{
        const connection = await mysql.createConnection(config.db)
        const [result,] = await connection.execute('insert into task (description) values (?)', [req.body.description])
        res.status(200).json({id:result.insertId})
    } catch(err){
        res.status(500).json({error: err.message})
    }
    
})

app.listen(port)