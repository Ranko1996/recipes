import React from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify';

const AddRecipeToDb = ({details}) => {
    const title = details.title
    const description = details.summary
    const image = details.image

    const addToDB = async(e) => {
        e.preventDefault()
        try {
            const body = {title,image, description}
            console.log(body)
            console.log("Bearer " + localStorage.access_token)
            const response = await fetch("http://localhost:3333/post", {
                method:"POST",
                headers: { Authorization: "Bearer " + localStorage.access_token, "Content-Type":"application/json"}, 
                body: JSON.stringify(body),
            })
            toast.success("Added to favorites") 
        } catch (error) {
            console.error(error.message)
        }
    }

    
    
  return (
    <AddButton onClick={addToDB}>Add to db</AddButton>
  )
}

const AddButton = styled.button`
    padding: 1rem 2rem;
    color: #b5a32f;
    background: white;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight: 600;
`

export default AddRecipeToDb