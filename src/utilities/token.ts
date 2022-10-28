import jwt from "jsonwebtoken";
import envVariables from '../env'

const token = {
  createToken(payload: any) {
    return jwt.sign(payload, `${envVariables?.JWT_SECRET}`);
  },

  confirmToken(bearerAuth: any) {
    const [, token] = bearerAuth.split(" ");
    return jwt.verify(token, `${envVariables?.JWT_SECRET}`); 
  },
};

 
 
export { token };
