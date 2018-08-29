const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.set('view engine', 'ejs')

app.listen(2222,()=>{console.log("Listening!");})


app.get('/', (req, res)=>{
    jwt.verify(req.cookies.token, "enty-loon-3oodek-fe5doodek", function(err, decoded) {
      if(err){
        //console.log(err);
        res.render('index', {username : null, token : null});
      }
      else{
        console.log(decoded.username)
        res.render('index', {username : decoded.username, token : null});
      }
    });
})

app.post('/', (req, res)=>{
  jwt.sign({ username: req.body.username }, "enty-loon-3oodek-fe5doodek", function(err, token) {
    console.log("Token: " + token);
    res.redirect(`/register/${token}`)
  });
})

app.get('/register/:token', (req, res)=>{
    res.locals.query = req.params.token;
    res.render('register');
})
