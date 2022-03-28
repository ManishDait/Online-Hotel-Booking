const express = require('express');
var mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "Test",
});
conn.connect(function(err){
    if(err)throw err;
    console.log(`connected to database`);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('App'));
app.post('/Html/thanks.html',(req,res) => {
    
    let room = req.body.rooms;
    let loc = req.body.loc;
    let cin = req.body.cin;
    let cout = req.body.cout;
    let price = req.body.price;
    let ac = req.body.Ac;
    let bed = req.body.bed;
    let wifi = req.body.wifi;
    let ssv = req.body.view;
    if(wifi == undefined){
        wifi = "no";
    }
    if(ssv == undefined){
        ssv = "no"
    }
    
    conn.query(`insert into Bookings values('${room}','${loc}','${cin}','${cout}','${price}','${wifi}','${ac}','${bed}',"${ssv}")`);
    console.log("Added");
    res.redirect("/Html/thanks.html");
    res.end();
});

app.post('/Html/singup.html',(req,res) => {
    let uname = req.body.uname;
    let pass = req.body.pass;
    let mail = req.body.email;
    
    
    conn.query(`insert into Login values('${uname}','${pass}','${mail}')`);
    console.log("New User added");
    res.redirect("/Html/booking.html");
    res.end();
    

})

app.post('/Html/booking.html',(req,res) => {
    
    let cuname = req.body.cuname;
    let cpass = req.body.cpass;
    conn.query(`select * from Login where uname='${cuname}' and pass='${cpass}'`,(err,row,fields) => {
        console.log(row);
        if(row.length > 0){
            res.redirect("/Html/booking.html");
        }
        else{
            res.redirect("/index.html");
            console.log(`wrong pass`);
        }
        res.end();
        
    });
    
    

})

const port = 8080;
app.listen(port,() => {
    console.log(`Server is running at localhost:${port}`)
})