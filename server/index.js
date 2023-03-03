const express = require('express')
const cors = require('cors')
const mysql = require('mysql')

const app = express()
app.use(cors())

var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"todolist"
})
con.connect(function(err){
    if(err) console.log(err)
    console.log("Conected to DataBase")
})

app.get("/gettask",function(req,res){
    const sql = "Select * from base"
    con.query(sql,function(err,result,fields){
        if(err) console.log("error: "+err)
        res.send(result)
        console.log(fields)
    })
})

app.get("/addtask/:nazwa/:termin",function(req,res){
    const nazwa = req.params.nazwa
    const termin = req.params.termin
    
    const sql = `INSERT INTO base (nazwa, done, termin) VALUES ('${nazwa}','0','${termin}')`
    con.query(sql,function(err,result,fields){
        if(err) console.log("error: "+err)
        res.send("dodane")
        console.log(fields)
    })
})

app.get("/deltask/:ID",function(req,res){
    const ID = req.params.ID
    const sql = `DELETE FROM base WHERE ID = ${ID}`
    con.query(sql,function(err,result,fields){
        if(err) console.log("error: "+err)
        res.send("usunięte")
        console.log(fields)
    })
})
    


app.listen(3000)