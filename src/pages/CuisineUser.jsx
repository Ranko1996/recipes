import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { NavLink, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Search from '../components/Search'
import Category from '../components/Category'

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

    useEffect(() => {
        getRecipes()
    },[])
    
  return (
    <>
        <Search />
        <Category />
        <Grid>
            {recipes.map((item) => {
                return (
                    <Card key={item.id}>
                        <Link to={`/recipe/${item.id}`}>
                        <img src={item.image} alt="Recipe" />
                        <h4>{item.title}</h4>
                        </Link>
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