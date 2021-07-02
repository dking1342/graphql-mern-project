import { GraphAuthors, GraphBooks } from '../models/graphqlModels.js';
import { 
    GraphQLID, 
    GraphQLInt, 
    GraphQLList, 
    GraphQLNonNull, 
    GraphQLObjectType, 
    GraphQLSchema, 
    GraphQLString 
} from 'graphql';

const BookType = new GraphQLObjectType({
    name:"Book",
    fields:()=>({
        id:{
            type:GraphQLID
        },
        name:{
            type:GraphQLString
        },
        genre:{
            type:GraphQLString
        },
        author:{
            type:AuthorType,
            async resolve(parent,args){
                try {
                    let { authorId } = parent;
                    let books = await GraphAuthors.findById(authorId);
                    return books;                    
                } catch (error) {
                    return error.message;
                }
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name:"Author",
    fields:()=>({
        id:{
            type:GraphQLID
        },
        name:{
            type:GraphQLString
        },
        age:{
            type:GraphQLInt
        },
        books:{
            type: new GraphQLList(BookType),
            async resolve(parent,args){
                try {
                    let { id } = parent;
                    let authors = await GraphBooks.find({authorId:id});
                    return authors;                    
                } catch (error) {
                    return error.message
                }
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{
                id:{
                    type: GraphQLID
                }
            },
            async resolve(parent,args){
                try {
                    let { id } = args;
                    let book = await GraphBooks.findById(id);
                    return book;                    
                } catch (error) {
                    return error.message
                }

            }
        },
        author:{
            type:AuthorType,
            args:{
                id:{
                    type:GraphQLID
                }
            },
            async resolve(parent,args){
                try {
                    let { id } = args;
                    let authors = await GraphAuthors.findById(id);
                    return authors;
                } catch (error) {
                    return error.message;
                }
            }
        },
        books:{
            type: new GraphQLList(BookType),
            async resolve(parent,arg){
                try {
                    let books = await GraphBooks.find({});
                    return books;                    
                } catch (error) {
                    return error.message;
                }
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            async resolve(parent,args){
                try {
                    let authors = await GraphAuthors.find({});
                    return authors;
                } catch (error) {
                    return error.message;
                }
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{
                    type: new GraphQLNonNull(GraphQLString)
                },
                age:{
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            async resolve(parent,args){
                try {
                    let author = new GraphAuthors({
                        name: args.name,
                        age:args.age
                    })
                    return await author.save()
                } catch (error) {
                    return error.message
                }
            }
        },
        removeAuthor:{
            type: AuthorType,
            args:{
                id:{
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            async resolve(parent,args){
                try {
                    return await GraphAuthors.findByIdAndDelete(args.id);
                } catch (error) {
                    return error.message;
                }
            }
        },
        updateAuthor:{
            type: AuthorType,
            args:{
                name:{
                    type: GraphQLString
                },
                age:{
                    type:GraphQLInt
                },
                id:{
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            async resolve(parent,args){
                try {
                    let existingAuthor = await GraphAuthors.findById(args.id);

                    let newAuthorObj = {
                        name: args.name || existingAuthor.name,
                        age: args.age || existingAuthor.age
                    }

                    return await GraphAuthors.findByIdAndUpdate(args.id,newAuthorObj,{new:true,useFindAndModify:true});
                } catch (error) {
                    return error.message;
                }
            }
        },
        addBook:{
            type: BookType,
            args:{
                name:{
                    type: new GraphQLNonNull(GraphQLString)
                },
                genre:{
                    type: new GraphQLNonNull(GraphQLString)
                },
                authorId:{
                    type:new GraphQLNonNull(GraphQLID)
                }
            },
            async resolve(parent,args){
                try {
                    let book = new GraphBooks({
                        name: args.name,
                        genre: args.genre,
                        authorId: args.authorId
                    });
                    return await book.save();
                } catch (error) {
                    return error.message;
                }
            }
        },
        removeBook:{
            type:BookType,
            args:{
                id:{
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            async resolve(parent,args){
                try {
                    return await GraphBooks.findByIdAndDelete(args.id);
                } catch (error) {
                    return error.message;                    
                }
            }
        },
        updateBook:{
            type:BookType,
            args:{
                id:{
                    type: new GraphQLNonNull(GraphQLID)
                },
                name:{
                    type: GraphQLString
                },
                genre:{
                    type:GraphQLString
                },
                authorId:{
                    type: GraphQLID
                }
            },
            async resolve(parent,args){
                try {
                    let existingBook = await GraphBooks.findById(args.id);

                    let newBookObj = {
                        name: args.name || existingBook.name,
                        genre: args.genre || existingBook.genre,
                        authorId: args.authorId || existingBook.authorId
                    }

                    return await GraphBooks.findByIdAndUpdate(args.id,newBookObj,{new:true,useFindAndModify:true});
                } catch (error) {
                    return error.message;
                }
            }
        }
    }
})

let gqlSchema = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
});

export default gqlSchema