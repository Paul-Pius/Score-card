import mongoose from 'mongoose';

//--create a schema for stack--//
const stacKSchema = new mongoose.Schema({
    stackName: String,
    stackDescription: String,
}, { timestamps: true });

const StackModel = mongoose.model('stack', stacKSchema);


export { StackModel };