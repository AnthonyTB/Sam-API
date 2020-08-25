const LoginQuery = require('./LoginQuery');
const User = require('../interfaces');
import { Response, NextFunction } from 'express';

// Checks user auth token to see if its valid
function requireAuth(req: any, res: Response, next: NextFunction) {
  const authToken = req.get('Authorization') || '';
  let bearerToken;
  if (!authToken.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'Missing bearer token' });
  } else {
    bearerToken = authToken.slice(7, authToken.length);
  }
  try {
    const payload = LoginQuery.verifyJwt(bearerToken);
    LoginQuery.getUserWithUserName(req.app.get('db'), payload.sub)
      .then((user: typeof User) => {
        if (!user)
          return res.status(401).json({ error: 'Unauthorized request' });
        req.user = user;
        next();
      })
      .catch((err: string) => {
        console.error(err);
        next(err);
      });
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized request' });
  }
}

module.exports = requireAuth;
