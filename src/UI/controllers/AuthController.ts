import { Request, Response, NextFunction } from "express";
import session, { Session } from 'express-session';
interface MySession extends session.SessionData {
    isLoggedIn: boolean;
}  

export class AuthController {
    getLoginPage = (req: Request, res: Response, next: NextFunction) => {
        console.log(req.session);
        res.render('auth/login');
    }

    postLogin = (req: Request, res: Response, next: NextFunction) => {
        // res.setHeader('Set-Cookie', 'loggedIn=true');
        (req.session as unknown as MySession).isLoggedIn = true;
        res.redirect('/profile/3');
    }
}