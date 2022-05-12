import React, {useState, useEffect} from 'react';
import { Wrapper, Gradient, Card } from './SliderCSS';
import { Splide, SplideSlide} from '@splidejs/react-splide'
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom'


function Veggie (){

  const [veggie, setVeggie] = useState([]);

  
  const getVeggie = async() => {

    const check = localStorage.getItem('veggie')

    if(check) {
      setVeggie(JSON.parse(check))
    }else {
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`)
      const data = await api.json()
      localStorage.setItem('veggie', JSON.stringify(data.recipes))
      setVeggie(data.recipes)
      console.log(veggie)
    }
  }
    
  useEffect(() => {
    getVeggie()
  },[]);


  return <>
  <Wrapper>
    <h3>Our Vegeterian picks</h3>
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
      {veggie.map((recipe) => {
        return(
          <SplideSlide key={recipe.id}>
            <Card>
              <Link to={`/recipe/${recipe.id}`}>
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

export default Veggie