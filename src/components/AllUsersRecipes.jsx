import React, {useState, useEffect} from 'react';
import { Wrapper, Gradient, Card } from './SliderCSS';
import { Splide, SplideSlide} from '@splidejs/react-splide'
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom'


function AllUsersRecipes (){

  const [recipes, setRecipes] = useState([]);

  
  const getRecipes = async() => {

      const response = await fetch(`http://localhost:3333/post/all`, {
        method: "GET",
        headers: { Authorization: 'Bearer ' + localStorage.access_token, "Content-Type": "application/json" }
      })
        const parseRes = await response.json()
        setRecipes(parseRes)
  }
    
  useEffect(() => {
    getRecipes()
  },[]);


  return <>
  <Wrapper>
    <h3>Users pick</h3>
    <Splide options={{
      breakpoints: {
        2048: {
          perPage: 3,
        },
        1100: {
          perPage: 2,
        },
        720: {
          perPage: 1,
    
        },
      },
      arrows: false,
      pagination: false,
      drag: 'free',
      gap: '5rem',
    }}>
      {recipes.map((recipe) => {
        return(
          <SplideSlide key={recipe.id}>
            <Card>
            <Link to={`/myRecipeAll/${recipe.id}`}>
                <img src={recipe.image} alt={recipe.title} />
                <Gradient />
              </Link>
            </Card>
              <p style={{textAlign:'center', width:'100%', justifyContent:'center', fontSize:'1rem', fontWeight:'600', marginTop:'-1.5em'}}>{recipe.title}</p>
          </SplideSlide>
        )
      })}
    </Splide>
  </Wrapper>
</>
}

export default AllUsersRecipes