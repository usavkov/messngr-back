import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

dotenv.config();

export function authenticate(context: any): any {
  const token = context.req.headers.authorization.split('Bearer ')[1];

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, decodedToken: any) => {
    if (decodedToken) {
      context.user = {
        ...context.user,
        isAuthorized: !Boolean(err),
        login: decodedToken.login,
        userId: decodedToken.userId,
        username: decodedToken.username,
        role: decodedToken.role,
      };
    }
  });

  return context;
}

export const authenticateWS = (token) => {
  let user;

  console.log(token);

  jwt.verify(
    token?.split('Bearer ')?.[1],
    process.env.JWT_SECRET!,
    (err: any, decodedToken: any) => {
      if (decodedToken) {
        user = {
          isAuthorized: !Boolean(err),
          login: decodedToken.login,
          userId: decodedToken.userId,
          username: decodedToken.username,
          role: decodedToken.role,
        };
      }
    }
  );

  return user;
};
