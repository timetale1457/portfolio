import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import logger from '../../../util/logger';

const testRouter = Router();

dotenv.config();

testRouter.get('/', (req: Request, res: Response) => {
    // 로그인 로직 처리
    res.send(`
        <h1>Log in</h1>
        <a href="/api/v1/test/login">Log in</a>
    `);
});

testRouter.get('/login', passport.authenticate('google', { scope: ['profile', 'email'] })); // 프로파일과 이메일 정보를 받는다.

//? 위에서 구글 서버 로그인이 되면, 네이버 redirect url 설정에 따라 이쪽 라우터로 오게 된다. 인증 코드를 박게됨
testRouter.get('/google/callback', (req: Request, res: Response, next: NextFunction) => {
    const { code } = req.query;
    logger.info(`code: ${code}`);
    passport.authenticate('google', { failureRedirect: '/api/v1/test/' }, 
        (err, user, info) => {
            if (err) {
                return next(err);  // 에러가 있으면 다음 미들웨어로 전달
            }
            if (!user) {
                return res.redirect('/api/v1/test/');  // 로그인 실패 시 리다이렉트
            }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                return res.redirect('/api/v1/test/profile');  // 로그인 성공 시 리다이렉트
            });
        })(req, res, next);
});

testRouter.get('/profile', (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        res.send(`<h1>Hello ${req.user.displayName}</h1>`);
    } else {
        res.redirect('/');
    }
});

export default testRouter;