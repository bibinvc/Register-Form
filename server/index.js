const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

//databse connection

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password:"root",
    database: "loginsystem",
});
//registration
app.post('/register', (req, res) => {

    const username= req.body.username;
    const email= req.body.email;
    const password= req.body.password;

    db.query(
        "INSERT INTO users (username,email, password) VALUES(?, ?, ?)", 
    [username, email, password],
    (err, result)=> {
        console.log(err);

    }
  );
});
//login
app.post('/login', (req,res)=> {

    const username= req.body.username;
    const password= req.body.password;

    db.query(
        "SELECT * FROM users WHERE username = ?  AND PASSWORD = ?", 
        [username, password],
        (err, result) => {
            if(err){
                res.send({err: err})
            } 
            
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "incorrect username and password!"});

            }
        
    }
    );

})
app.listen(3001, () => {
    console.log("server");

});