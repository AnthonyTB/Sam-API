import xss from 'xss';
import bcrypt from 'bcryptjs';
import { User, passwordReq } from '../../interfaces';

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;

const AccountQuery = {
  // updates user's password based on user id
  // params: knex -> db, id -> user's id, password -> hashed user password
  updateAccount(knex: any, id: number, updatedPassword: passwordReq) {
    return knex('users').where({ id }).update('Password', updatedPassword);
  },
  // checks new password value to make sure it meets all requirements
  // params: password -> unhashed password string
  validatePassword(password: string) {
    if (password.startsWith(' ') || password.endsWith(' ')) {
      return 'Password must not start or end with empty spaces';
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return 'Password must contain 1 upper case, lower case, number and special character';
    }
    return null;
  },
  // hashes user's password in case of breach
  // params: password -> unhashed password string
  hashPassword(password: string) {
    return bcrypt.hash(password, 12);
  },
  // seralizes the data preventing silly xss
  // params: user -> user data object
  serializeUser(user: User) {
    return {
      Id: user.Id,
      Password: xss(user.Password),
    };
  },
};

export default AccountQuery;
