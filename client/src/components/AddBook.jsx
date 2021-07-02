import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { addBookMutation, getAuthorQuery, getBooksQuery } from '../queries/queries'

const AddBook = () => {
    const [authorId,setAuthorId]=useState('');
    const [name, setName]=useState('');
    const [genre,setGenre]=useState('');

    const { data } = useQuery(getAuthorQuery);
    const [addBook,{data:results}]=useMutation(addBookMutation);

    useEffect(()=>{
        if(data){
            setAuthorId(data.authors[0].id);
        }
    },[data]);

    const handleClick = (e) => {
        e.preventDefault();
        addBook({
            variables:{
                name:name,
                genre:genre,
                authorId:authorId
            },
            refetchQueries:[{query:getBooksQuery},{query:getAuthorQuery}]
        });
        setName('');
        setGenre('');
        setAuthorId(data.authors[0].id);
        console.log(results)
    }

    return (
        <form id="addBook">
            <div className="field">
                <label htmlFor="name">
                    Book name:
                </label>
                <input 
                    type="text" 
                    name="name"    
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    required
                />
            </div>
            <div className="field">
                <label htmlFor="genre">
                    Genre:
                </label>
                <input 
                    type="text" 
                    name="genre"
                    value={genre}
                    onChange={(e)=>setGenre(e.target.value)}
                    required
                />
            </div>
            <div className="field">
                <label htmlFor="author">
                    Author:
                </label>
                <select name="authors" value={authorId} onChange={(e)=>setAuthorId(e.target.value)} required >
                    {
                        data ? (
                                data.authors.map((author,i)=>(
                                    <option key={i} value={author.id}>{author.name}</option>
                                ))
                        ) : (
                            <></>
                        )
                    }
                </select>
            </div>
            <button
                type='submit'
                onClick={handleClick}
            >
                +
            </button>
        </form>
    )
}

export default AddBook
