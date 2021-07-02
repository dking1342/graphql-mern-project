import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import gql from './config/graphql.js';
import connectdb from './config/mongodb.js';
import graphRouter from './routes/graphqlRoutes.js';
import cors from 'cors';

// connects the mongodb
connectdb();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// routes
app.use('/api/graphql',graphRouter);
app.use('/graphql',graphqlHTTP(gql));

// app init
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log('Server listening...'))