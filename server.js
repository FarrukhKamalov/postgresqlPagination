const express = require("express");
const app = express();
const {Pool} = require('pg');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const pool = new Pool({
    connectionString: 'postgres://postgres:admin@localhost:5432/courses'
})

//PERN PAGINATION START

app.get('/', async(req,res)=>{
    try {
        const {limit, page} = req.query;
        const buttons = [];
        const client = await pool.connect();
        const {rows: pages} = await client.query('SELECT * FROM books');

        if(!limit){
            for(let i = 1; i<= Math.ceil(pages.length / 3); i++){
                buttons.push(i)
            }
        }
        for(let i = 1; i<= Math.ceil(pages.length / +limit); i++){
            buttons.push(i)
        }
       
        const {rows: data} = await client.query('SELECT * FROM books OFFSET $1 LIMIT $2', [(page - 1) * limit, limit])
        client.release();
        res.json({buttons, data})
    } catch (error) {
        console.log(error)
    }
})




//PERN PAGINATION END









app.listen(process.env.PORT || 4000, ()=>{
    console.log('http://localhost:4000')
})