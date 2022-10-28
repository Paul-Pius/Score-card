import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, {Schema, model} from "mongoose";
import { StackModel } from "../../model/stacks_model/stacks_model";
import { AdminModel } from "../../model/admin/adminDB";

let mongoServer: any = null;

export const dbConnect = async () => {
    const mongoServer = await MongoMemoryServer.create();
    const uri = await mongoServer.getUri();
    const mongooseOpts: any = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    await mongoose.connect(uri, mongooseOpts);
}

export const dbDisconnect = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    
    if(mongoServer){
        mongoServer.stop();
    }
}

export const dropCollections = async function(){
    if(mongoServer){
        const collections = await mongoose.connection.db.collections();
        for(let collection of collections){
            await collection.deleteOne({});
        }
    }
}
