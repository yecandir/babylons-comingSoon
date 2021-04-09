const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/fonts', express.static(path.join(__dirname, 'public/fonts')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/vendor', express.static(path.join(__dirname, 'public/vendor')));

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.get('*', (req, res)=> {
    res.render('index');
})

app.listen(port, ()=> {
    console.log('App is listening at ' + port);
})