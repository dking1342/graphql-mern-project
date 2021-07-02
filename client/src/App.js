import React from 'react'
import BookList from './components/BookList';
import { 
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from '@apollo/client'
import AddBook from './components/AddBook';
import { onError } from "@apollo/client/link/error";


const httpLink = new HttpLink({
  uri: "http://localhost:5000/graphql"
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link:from([errorLink,httpLink]),
  cache: new InMemoryCache(),
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <main className='main'>
        <h1>Book List</h1>
        <BookList />
        <AddBook />
      </main>
    </ApolloProvider>
  )
}

export default App
