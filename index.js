require('dotenv').config();
import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from "morgan";
import path from 'path';
import dbConfig from './config/db.config'
dbConfig.connectMyDb()
const app = express();
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, './uploads')));
app.set('views', path.join(__dirname, './helper', 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
const PORT = 8000


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Content-Length, Authorization, Accept, X-Requested-With");
    res.header('Access-Control-Expose-Headers', 'Content-Disposition');
    next();
})

app.use('/api', require('./routes/')) // routes

app.get("/", (req, res) => { res.json({ message: "Welcome ........." }); });


app.listen(PORT, () => {
    console.log(`server running ${PORT}`)

});

