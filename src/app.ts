import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import FeedRoutes from './routes/FeedRoutes';
import ProfileRoutes from './routes/ProfileRoutes';
import AuthRoutes from './routes/AuthRoutes';
import session, { Session } from 'express-session';
import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config();


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'UI/views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'UI/public')));
app.use(
    session({secret : 'My secret', resave: false, saveUninitialized: false})
);

// app.use(ProfileRoutes);
app.use('/feed', FeedRoutes);
app.use('/profile', ProfileRoutes);
app.use(AuthRoutes);

app.listen(process.env.PORT, ():void=>{
    console.log("Server Running");
});


