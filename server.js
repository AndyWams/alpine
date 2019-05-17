import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import appRoute from './router/routes';
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const http = require('http')
const expressValidator = require('express-validator');


app.use(cors());
app.use(bodyParser.json());

const CONNECTION_URI = process.env.MONGODB_URI  || 'mongodb://localhost:27017/alpynDb';

//connect to mongoDb using mongoose
mongoose.set('useCreateIndex', true)
mongoose.connect(CONNECTION_URI, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

//check for db erros
connection.on('error', function (err) {
    console.log(err);
});

//Express validator Middleware
app.use(expressValidator({
    errorFormatter: function (param, msg) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;
        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }

        return {
            msg: msg,
         
        };
    }
}));

app.use('/', appRoute);
app.use(express.static(path.join(__dirname, '/dist')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.set('port', (process.env.PORT || 3000));
// Listen for set port
app.listen(app.get('port'), (err) => {
    if (err) {
        console.log("Error starting server");
        console.log(err);
        return
    }
    console.log("Server listening on port : " + app.get('port'));
});

