import express from 'express';
import LoginQuery from './LoginQuery';
import { User } from '../../interfaces';
import { Request, Response, NextFunction } from 'express';

const Login = express.Router();
const jsonBodyParser = express.json();

// Used to process user login
// params: N/A
// body: Req body contains users id, and password
Login.post(
  '/login',
  jsonBodyParser,
  (req: Request, res: Response, next: NextFunction) => {
    const { Username, Password } = req.body;
    const loginUser = { Username, Password };

    for (const [key, value] of Object.entries(loginUser))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`,
        });
    LoginQuery.getUserWithUserName(req.app.get('db'), loginUser.Username)
      .then((dbUser: User) => {
        if (!dbUser)
          return res.status(400).json({
            error: 'No such user',
          });

        return LoginQuery.comparePasswords(
          loginUser.Password,
          dbUser.Password
        ).then((compareMatch: string) => {
          if (!compareMatch)
            return res.status(400).json({
              error: 'Incorrect password',
            });
          const sub = dbUser.Username;
          const payload = { user_id: dbUser.Id };
          res.send({
            authToken: LoginQuery.createJwt(sub, payload),
          });
        });
      })
      .catch(next);
  }
);

export default Login;
