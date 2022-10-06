const express = require('express')
const cors = require('cors')
const mysql = require('mysql2/promise')
const config = require('./config')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const port = 3001

app.get("/",async function (req,res) {
    try{
        const connection = await mysql.createConnection(config.db)
        const result = await connection.execute('select * from task')
        if (!result) result =[] // If there is not data, return empty array.
        res.status(200).json(result[0])
    } catch(err){
        res.status(500).json({error: err.message})
    }
    
})

app.listen(port)