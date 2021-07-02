import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { getBookQuery } from '../queries/queries'

const BookDetails = ({bookId}) => {
    const { 
        loading, 
        error, 
        data 
    } = useQuery(getBookQuery,{
        variables:{
            id:bookId
        }
    });
    const [list,setList]=useState(null);

    useEffect(()=>{
        if(bookId && data){
            setList(data);
            console.log(data,bookId)
        }
    },[bookId, data])



    if(loading) return <p>Loading...</p>
    if(error) return <p>{error}</p>
    if(list) return(
        <>
            <h3>Book details</h3>
            <ul>
                <li><i>Book name:</i> <b>{data.book.name}</b></li>
                <li>Genre: {data.book.genre}</li>
                <li>Author: {data.book.author.name}</li>
                <li>Author age: {data.book.author.age}</li>
                <li><h3>Books</h3></li>
                <ul className='otherBooks'>
                    {
                        data.book.author.books.map((b,i)=>(
                            <li key={i}>{b.name}</li>
                        ))
                    }
                </ul>
            </ul>
        </>
    )
    return(
        <div>
            <h3>No book selected</h3>
        </div>
    )
}

export default BookDetails
