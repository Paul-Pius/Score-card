import bcrypt from "bcrypt";
import Chance from 'chance'

const password = {
  async hash(password: any) {
    return await bcrypt.hash(password, 10);
  },
  async random (){
      const chance = new Chance ();
      return chance.string({ length: 7 });
  },

  async compare(password: any, hash: any){
    return await bcrypt.compare(password, hash)
  }
};


  


export { password };
