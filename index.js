const express = require('express');
const bodyParser = require('body-parser');
const https = require('https')
const fs = require('fs')
const http = require('http')
// const port = 3000;
const app = express();



/*https*/
const options = {
    key: fs.readFileSync('ssl/privkey.pem'),
    cert: fs.readFileSync('ssl/cert.pem')
};



/*middle ware*/
app.use(express.static(__dirname + '/public'));
app.use(function (req, res, next){
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Methods", 'GET');//POST, PUT, DELETE 는 구현하지 않음.
    res.header("Access-Control-Allow-Headers", "content-type");
    next();
})

/* body-parser */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/* router */
app.use(['/semester/week/giksa', '/semester/weekend/giksa', 'vacation/week/giksa', 'vacation/weekend/giksa'], require('./router/giksa'))
app.use(['/semester/week/shuttlecock', '/semester/weekend/shuttlecock', 'vacation/week/shuttlecock', 'vacation/weekend/shuttlecock'], require('./router/shuttlecock'))
app.use(['/semester/week/subway', '/semester/weekend/subway', 'vacation/week/subway', 'vacation/weekend/subway'], require('./router/subway'))
app.use(['/semester/week/yesulin', '/semester/weekend/yesulin', 'vacation/week/yesulin', 'vacation/weekend/yesulin'], require('./router/yesulin'))
app.use((req, res, next) => {
  next(createError(404))
})

app.use((err, req, res, next) => {
  res.status(404)
  res.json({ errorcode: '404' })
})

/*server*/
// Create an HTTP service.
http.createServer(app).listen(3000);
// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(443);
