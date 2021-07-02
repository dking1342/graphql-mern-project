import { useMutation,useQuery } from '@apollo/client'
import React, { useState } from 'react';
import { getBooksQuery,deleteBookMutation } from '../queries/queries';
import BookDetails from './BookDetails';

const BookList = () => {
    const [bookId, setBookId]=useState('');
    const { loading, error, data } = useQuery(getBooksQuery);
    const [removeBook,{data:results}]=useMutation(deleteBookMutation);

    
    const handleClick = (id) => {
        setBookId(id);
    }

    const handleDelete = (id) => {
        removeBook({
            variables:{
                id:id
            },
            refetchQueries:[{query:getBooksQuery}]
        });
        console.log(results)
    }

    if(loading) return <p>Loading...</p>
    if(error) return <p>{error}</p>
    return(
        <>
            <ul id='bookList'>
                {
                    data.books.map(({name,id},i)=>(
                        <li key={i}>
                            {name}
                            <button onClick={()=>handleClick(id)}>Details</button>
                            <button onClick={()=>handleDelete(id)} >X</button>
                        </li>
                    ))
                }
            </ul>
            <BookDetails 
                bookId={bookId}
            />
        </>
    )
}

export default BookList
