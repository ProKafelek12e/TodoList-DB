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

app.get("/done/:ID/:done",function(req,res){
    const ID = req.params.ID
    const done = req.params.done
    if(done==0){
        const sql = `UPDATE base SET done = '1' WHERE ID = ${ID};`
        con.query(sql,function(err,result,fields){
            if(err) console.log("error: "+err)
            res.send("zmienion")
            console.log(fields)
        })
    }  
    else if(done==1){
        const sql = `UPDATE base SET done = '0' WHERE ID = ${ID};`
        con.query(sql,function(err,result,fields){
            if(err) console.log("error: "+err)
            res.send("zmienion")
            console.log(fields)
        })
    }    
})


app.listen(3000)