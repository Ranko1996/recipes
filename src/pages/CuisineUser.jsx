import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { NavLink, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Search from '../components/Search'
import Category from '../components/Category'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddRecipe from '../components/AddRecipe'


const CuisineUser = () => {
    const[recipes, setRecipes] = useState([])
    async function getRecipes() {
        try {
          const response = await fetch("http://localhost:3333/post", {
            method: "GET",
            headers: { Authorization: 'Bearer ' + localStorage.access_token, "Content-Type": "application/json" }
          });
          const parseRes = await response.json()
          setRecipes(parseRes)
          console.log(recipes)
        
        } catch (error) {
          console.error(error.message)
        }
      }

      async function deleteRecipe(recipeId) {
        try {
            const response = await fetch(`http://localhost:3333/post/${recipeId}`,{
                method:"DELETE",
                headers: { Authorization: 'Bearer ' + localStorage.access_token, "Content-Type": "application/json" }
            })
            setRecipes(recipes.filter(recipes => recipes.id !== recipeId))
        } catch (error) {
            console.log(error.message)
        }
      }

    useEffect(() => {
        getRecipes()
    },[])
    
  return (
    <>
        <Search />
        <Category />
        <AddRecipe />
        <Grid>
            {recipes.map((item) => {
                return (
                    <Card key={item.id}>
                        <Link to={`/myRecipe/${item.id}`}>
                        <img src={item.image} alt="Recipe" />
                        </Link>
                          <h4 style={{display: "inline", marginTop:"1rem"}}>{item.title}</h4>
                          <DeleteOutlineIcon style={{display: "inline", marginTop:"1rem"}}
                            sx={{marginLeft:"15px", marginBottom:"-6px", color:"red"}}
                            onClick={() => deleteRecipe(item.id)}
                          />
                    </Card>
                )
            })}
        </Grid>
    </>
  )
}


const Grid = styled.div`
 display: grid;
 grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
 grid-gap: 3rem;
`;

const Card = styled.div`
  img{
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`

export default CuisineUser