import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import FeedRoutes from './routes/FeedRoutes';
import ProfileRoutes from './routes/ProfileRoutes';
import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config();

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'UI/views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'UI/public')));

app.use('/feed', FeedRoutes);
app.use('/profile', ProfileRoutes);
// app.use(ProfileRoutes);

app.listen(process.env.PORT, ():void=>{
    console.log("Server Running");
})
