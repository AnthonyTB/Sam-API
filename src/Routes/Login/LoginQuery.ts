const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config');

const LoginQuery = {
  // Grabs user data relating to the username passed
  // params: db -> db instance, Username -> string
  getUserWithUserName(db: any, Username: string) {
    return db('users').where({ Username }).first();
  },
  // Hashes incoming password and compares it to the hashed password in db to see if they match
  // params: Passowrd -> incoming password string, hash -> hashed password in db
  comparePasswords(Password: string, hash: string) {
    return bcrypt.compare(Password, hash);
  },
  // Creates web token for user
  // params: subject, payload
  createJwt(subject: any, payload: any) {
    return jwt.sign(payload, config.JWT_SECRET, {
      subject,
      algorithm: 'HS256',
    });
  },
  // Verifys that the stored token is valid
  // params: token -> incoming web token
  verifyJwt(token: string) {
    return jwt.verify(token, config.JWT_SECRET, {
      algorithms: ['HS256'],
    });
  },
  // Parses token from string
  // params: token -> string
  parseBasicToken(token: string) {
    return Buffer.from(token, 'base64').toString().split(':');
  },
};

export default LoginQuery;
