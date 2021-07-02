import gql from "graphql-tag";

export const getAuthorQuery = gql`
    {
        authors{
            name
            id
        }
    }
`;

export const getBooksQuery = gql`
    {
        books{
            name
            genre
            id
        }
    }
`;

export const addBookMutation = gql`
    mutation(
        $name:String!,
        $genre:String!,
        $authorId:ID!
    ){
        addBook(
            name:$name,
            genre:$genre,
            authorId:$authorId
        ){
            name
            id
        }
    }
`;

export const getBookQuery = gql`
    query($id:ID!){
        book(id:$id){
            id
            name
            genre
            author{
                id
                name
                age
                books{
                    name
                    id
                }
            }
        }
    }
`;

export const deleteBookMutation = gql`
    mutation($id:ID!){
        removeBook(id:$id){
            name
            id
        }
    }
`;


// another way to query
// const GET_BOOKS = gql`
//     query GetBooks{
//         books{
//             name
//             genre
//         }
//     }
// `