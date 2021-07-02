import mongoose from 'mongoose';

const GraphBooksSchema = new mongoose.Schema({
    name:String,
    genre:String,
    authorId:String,
});

export const GraphBooks = mongoose.model('GraphBooks',GraphBooksSchema);

const GraphAuthorsSchema = new mongoose.Schema({
    name:String,
    age:Number
});

export const GraphAuthors = mongoose.model('GraphAuthors',GraphAuthorsSchema);