import { GraphAuthors, GraphBooks } from '../models/graphqlModels.js';

// DESC    Gets all the books 
// ROUTE   GET /api/graphql/books
// ACCESS   Public
export const getBooks = async (req,res) => {
    try {
        let bookList = await GraphBooks.find({});
        res.status(200).json({success:true,count:bookList.length,payload:bookList})
    } catch (error) {
        res.status(400).json({success:false,payload:error.message})
    }
}

// DESC    Saves books to the database
// ROUTE   POST /api/graphql/books
// ACCESS  Public
export const postBooks = async (req,res) => {
    try {
        let bookList = req.body
        let book = await GraphBooks.create(bookList);

        if(book){
            res.status(201).json({success:true,payload:book})
        } else {
            res.status(400).json({success:false,payload:'data not saved'})
        }
    } catch (error) {
        res.status(400).json({success:false,payload:error.message})
    }
}

// DESC    Deletes all the books 
// ROUTE   DELETE /api/graphql/books
// ACCESS  Public
export const deleteBooks = async (req,res) => {
    try {
        await GraphBooks.deleteMany({});
        res.status(200).json({success:true,payload:'All files removed'})
    } catch (error) {
        res.status(400).json({success:false,payload:error.message})
    }
}

// DESC    Gets all the authors 
// ROUTE   GET /graphql/authors
// ACCESS  Public
export const getAuthors = async (req,res) => {
    try {
        let authors = await GraphAuthors.find({})
        res.status(200).json({success:true,count:authors.length,payload:authors});
    } catch (error) {
        res.status(400).json({success:false,payload:error.message})
    }
}

// DESC    Saves authors to the database 
// ROUTE   POST /graphql/authors
// ACCESS  Public
export const postAuthors = async (req,res) => {
    try {
        let authorsList = req.body;
        let authors = await GraphAuthors.create(authorsList);

        if(authors){
            res.status(201).json({success:true,payload:authors})
        } else {
            res.status(400).json({success:false,payload:'Could not find authors'})
        }
    } catch (error) {
        res.status(401).json({success:false,payload:error.message})
    }
}

// DESC    Deletes all authors records
// ROUTE   DELETE /graphql/authors
// ACCESS  Public
export const deleteAuthors = async (req,res) => {
    try {
        await GraphAuthors.deleteMany({});
        res.status(200).json({success:true,payload:'All records removed'})
    } catch (error) {
        res.status(400).json({success:false,payload:error.message})
    }
}