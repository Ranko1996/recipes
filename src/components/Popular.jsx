import React,{useEffect, useState} from 'react'
import { Splide, SplideSlide} from '@splidejs/react-splide'
import '@splidejs/react-splide/css';
import { Wrapper, Gradient, Card } from './SliderCSS';
import { Link } from 'react-router-dom'

function Popular() {

  const [popular, setPopular] = useState([]);

  
  const getPopular = async() => {

    const check = localStorage.getItem('popular')

    if(check) {
      setPopular(JSON.parse(check))
    }else {
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`)
      const data = await api.json()
      localStorage.setItem('popular', JSON.stringify(data.recipes))
      setPopular(data.recipes)
      console.log(popular)
    }

  }
    
  useEffect(() => {
    getPopular()
  },[]);

  return <>
    <Wrapper>
      <h3>Popular picks</h3>
      <Splide options={{
         breakpoints: {
          2048: {
            perPage: 4,
          },
          1500: {
            perPage: 3,
          },
          1120: {
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
        {popular.map((recipe) => {
          return(
            <SplideSlide key={recipe.id}>
              <Card>
                <Link to={`/recipe/${recipe.id}`}>
                  <img src={recipe.image} alt={recipe.title} />
                  <p>{recipe.title}</p>
                  <Gradient />
                </Link>
              </Card>
            </SplideSlide>
          )
        })}
      </Splide>
    </Wrapper>
  </>
}

export default Popular