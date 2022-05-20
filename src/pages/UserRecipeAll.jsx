import React, {useDeferredValue, useEffect, useState} from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import Search from '../components/Search';
import Category from '../components/Category';
import AddRecipeToDb from '../components/AddRecipeToDb';
import SendIcon from '@mui/icons-material/Send';
import { Typography, Box, Grid, TextField, Button, Stack } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { toast } from 'react-toastify';

function UserRecipeAll() {
    
    let params = useParams();
    const[details, setDetails] = useState({});
    const[comment, setComment] = useState("")
    const[comments, setComments] = useState([])
    const[user, setUser] = useState({})
  

    async function getEmail() {
        try {
            const response = await fetch("http://localhost:3333/users/me", {
               method:"GET",
               headers: { Authorization: 'Bearer ' + localStorage.access_token, "Content-Type": "application/json" }
            });
            const parseRes = await response.json()
            setUser(parseRes)
            console.log(user)
            console.log(parseRes)
        } catch (error) {
            console.error(error.message)
        }
    }

        async function getRecipes() {
            try {
              const response = await fetch(`http://localhost:3333/post/all/${params.id}`, {
                method: "GET",
                headers: { Authorization: 'Bearer ' + localStorage.access_token, "Content-Type": "application/json" }
              });
              const parseRes = await response.json()
              setDetails(parseRes)
            } catch (error) {
              console.error(error.message)
            }
          }


          async function getComments() {
            try {
              const response = await fetch(`http://localhost:3333/comment/${params.id}`,{
                method:"GET",
                headers: { Authorization: 'Bearer ' + localStorage.access_token, "Content-Type": "application/json" }
              })
              const parseRes = await response.json();
              setComments(parseRes)
              console.log(parseRes)
            } catch (error) {
              console.error(error.message)
            }
          }
          console.log(comments)
    
          async function deleteComment(commentId) {
            try {
                const response = await fetch(`http://localhost:3333/comment/${commentId}`,{
                    method:"DELETE",
                    headers: { Authorization: 'Bearer ' + localStorage.access_token, "Content-Type": "application/json" }
                })
                if(response.status === 403){
                    toast.error("You can't delete this comment")
                } else {
                    setComments(comments.filter(comment => comment.id !== commentId))
                }
                
            } catch (error) {
                console.log(error.message)
            }
          }

          const onSubmit = async(e) => {
       
            const postId = params.id
            const content = comment
            const userMail = user.email
            try {
                const body = {content, postId, userMail}
                const response = await fetch("http://localhost:3333/comment",
                {
                method:"POST",
                headers: { Authorization: "Bearer " + localStorage.access_token, "Content-Type":"application/json"}, 
                body: JSON.stringify(body),
            })
              
                console.log(response)
                console.log(body)
                setComment("")
            } catch (error) {
                console.error(error.message)
            }
          }
    
    
    useEffect(() => {
        getEmail()
        getRecipes()
        getComments()
    },[params.name])

  return (
    <>
        <Search />
        <Category />
        <DetailWrapper>
            <div>
                <h2>{details.title}</h2>
                <img src = {details.image} alt='' />
         
                <form className='d-flex mb-6' onSubmit={onSubmit} style={{marginTop:"2rem"}} >
                    <input 
                        type="text"
                        placeholder='Write Comment'  
                        value={comment} 
                        className='form-control' 
                        onChange={e => setComment(e.target.value)}
                    />
                    <button className='btn btn-success'>Comment</button>
                </form>
                {comments.map((comment) => {
                    return <>
                        <Grid item xs={12} sm={6} sx={{display:"inline"}}>
                            <Typography variant="h5" sx={{ textAlign:"center", marginBottom:"2rem", marginTop:"2rem" }}>
                            {comment.userMail}: {comment.content}
                            <DeleteOutlineIcon 
                                sx={{marginLeft:"15px", marginBottom:"-6px", color:"red"}}
                                onClick={() => deleteComment(comment.id)}
                            />
                            </Typography>
                        </Grid>
                    </>
                })}
            </div>
            <Info>
                <h3 dangerouslySetInnerHTML={{__html: details.description}}></h3>
            </Info>
        </DetailWrapper>
    </>
  )
}

const DetailWrapper = styled.div`
    margin-top: 10rem;
    margin-bottom: 5rem;
    display: flex;
    .active{
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }
    h2{
        margin-bottom: 2rem;
    }
    li{
        font-size: 1.2rem;
        line-height: 2.5rem;
    }
    ul{
        margin-top: 2rem;
    }
`

const Button1 = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight: 600;
`

const Info = styled.div `
    margin-left: 10rem;
`

export default UserRecipeAll