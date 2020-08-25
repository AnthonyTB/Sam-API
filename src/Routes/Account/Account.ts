import express from 'express';
import AccountQuery from './AccountQuery';
import { Request, Response, NextFunction } from 'express';
import { User } from '../../interfaces';

const Account = express.Router();
const bodyParser = express.json();

// updates user's password based on user id
// params: N/A
// body: Req body contains users id, and new password
Account.route('/').put(
  bodyParser,
  async (req: Request, res: Response, next: NextFunction) => {
    const { Id, Password } = req.body;
    const knexInstance = req.app.get('db');
    let updatedPassword = Password;

    if (Password) {
      const passwordError = AccountQuery.validatePassword(Password);
      if (passwordError) {
        return res.status(400).json({
          error: passwordError,
        });
      }
      await AccountQuery.hashPassword(Password).then(
        (hashedPassword: string) => {
          updatedPassword = hashedPassword;
        }
      );
    }

    return AccountQuery.updateAccount(knexInstance, Id, updatedPassword).then(
      (update: User) => {
        res.status(204).json(AccountQuery.serializeUser(update));
      }
    );
  }
);

export default Account;
