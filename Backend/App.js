import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import companyRoute from './routes/companyRoute.js';
import reviewRoute from './routes/reviweRoute.js';
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(cors());

app.use('/uploads',express.static('uploads'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.Mongo).then(() =>console.log('Database connected'))
.catch((error)=>{
console.log('Database connection error',error)
});

app.use('/company', companyRoute);
app.use('/review', reviewRoute);

app.listen(5000,()=>{
    console.log('server started at.. http://localhost:5000');
})