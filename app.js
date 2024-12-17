const express = require('express');
const cookieParser=require('cookie-parser');
const dotenv=require('dotenv');
dotenv.config({path:'./.env'});
const path = require('path');

const app = express();


const employeeRoutes = require('./routes/employeeRoutes');
const managerRoutes = require('./routes/managerRoutes');

const {getRestrictManger}=require('./middleware/auth')
const { connectToMongoDB } = require('./connect');

const cors=require('cors');

const mongodbLocalUrl=process.env.MONGODB_LOCAL_URL;
const mongodbAtlasUrl=process.env.MONGODB_ATLAS_URL;

const PORT=process.env.PORT || 8001;

connectToMongoDB(mongodbLocalUrl,
{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})
    .then(() => { console.log('connected to DB at local stystem'); })

// connectToMongoDB(mongodbAtlasUrl,
// {
//     useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
// })
//     .then(() => { console.log('connected to DB at atlas'); })

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

var corsOptions = {
    origin: "http://localhost:4200"
  };
  app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());


app.use('/employee',getRestrictManger,employeeRoutes);
app.use('/manager', managerRoutes);

app.listen(PORT, () => {
    console.log(`server is live at PORT ${PORT} http://localhost:8001/employee`);
})