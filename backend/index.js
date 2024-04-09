const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const { application } = require('express');

const app = express();

app.use(cors());
app.use(bodyparser.json());

// database connection
const db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'mysql',
    database:'prueba',
    port:3306
});

//check database connection
db.connect(err=>{
    if(err) {console.log(err, 'dberror');}
    console.log('database connected...');
})

//get all data
app.get('/user', (req, res)=>{
    let qr = 'select *from tb_autor';
    db.query(qr,(err, result)=>{
        if(err){console.log(err, 'errs');}
        if(result.length>0){res.send({
            message: 'all user data',
            data: result
        });}
    });
});

//get single data
app.get('/user/:id', (req, res) =>{
    let gID = req.params.id;
    let qr = `select *from tb_autor where cod_autor = '${gID}'`;
    db.query(qr,(err, result)=>{
        if(err){console.log(err, 'errs');}
        if(result.length>0){res.send({
            message: 'get single data',
            data: result
        });}
        else{res.send({
            message: 'data not found'
        });}
    });
});

//create data
app.post('/user',(req, res) =>{
    console.log(req.body, 'createdata');

    let name = req.body.nom_autor;
    let lastname = req.body.ape_autor;
    let sons = req.body.hijos_autor;

    let qr = `insert into tb_autor(nom_autor,ape_autor,hijos_autor)
                    values('${name}', '${lastname}', '${sons}')`;
    
    console.log(qr, 'qr')
    db.query(qr,(err, result)=>{
        if(err){console.log(err);}
        console.log(result,'result')
        res.send({
            message: 'data inserted',
        });
    });
});

//update single data
app.put('/user/:id',(req, res) =>{

    console.log(req.body, 'updatedata');

    let gID = req.params.id;

    let name = req.body.nom_autor;
    let lastname = req.body.ape_autor;
    let sons = req.body.hijos_autor;

    let qr = `update tb_autor set nom_autor='${name}',ape_autor='${lastname}',hijos_autor='${sons}'
                where cod_autor='${gID}'`;
    
    db.query(qr,(err, result)=>{
        if(err){console.log(err);}
        res.send({
            message: 'data updated',
        });
    });
});

//delete single data
app.delete('/user/:id',(req,res)=>{

    let gID = req.params.id;

    let qr = `delete from tb_autor where cod_autor = '${gID}'`;
    db.query(qr,(err, result)=>{
        if(err) {console.log(err);}
        res.send({
            message: 'data deleted'
        })
    });

});

app.listen(3000, ()=>{
    console.log('server running...');
});