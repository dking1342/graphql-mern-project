import express from 'express';
import { 
    deleteAuthors,
    deleteBooks, 
    getAuthors, 
    getBooks, 
    postAuthors, 
    postBooks 
} from '../controllers/graphqlControllers.js';

const router = express.Router();

router.get('/',(req,res)=> res.status(200).json({success:true,payload:'msg sent'}));

router.get('/books',getBooks);
router.post('/books',postBooks);
router.delete('/books',deleteBooks);

router.get('/authors',getAuthors);
router.post('/authors',postAuthors);
router.delete('/authors',deleteAuthors);

export default router;