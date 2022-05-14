import React, {useDeferredValue, useEffect, useState} from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import Search from '../components/Search';
import Category from '../components/Category';
import AddRecipeToDb from '../components/AddRecipeToDb';

function Recipe() {
    
    let params = useParams();
    const[details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState("instructions");

    const fetchDetails = async() => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
        const detailData = await data.json()
        setDetails(detailData);
    }
    
    useEffect(() => {
        fetchDetails()
        console.log({details})
    },[params.name])

  return (
    <>
        <Search />
        <Category />
        <DetailWrapper>
            <div>
                <h2>{details.title}</h2>
                <img src = {details.image} alt='' />
            </div>
            <Info>
                <AddRecipeToDb details= {details}>

                </AddRecipeToDb>
                <Button 
                    className={activeTab === 'instructions' ? 'active' : '' } 
                    onClick={() => setActiveTab('instructions')}>
                        Instructions
                </Button>
                <Button 
                    className={activeTab === 'ingredients' ? 'active' : ''} 
                    onClick={() => setActiveTab('ingredients')}>
                        Ingredients
                </Button>
                {activeTab === 'instructions' && (
                    <ul>
                        <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
                        <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
                    </ul>
                )}
                {activeTab === 'ingredients' && (
                    <ul>
                        {details.extendedIngredients.map((ingridient) => 
                            <li key={ingridient.id}>{ingridient.original}</li>
                        )}
                    </ul>
                )}
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

const Button = styled.button`
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

export default Recipe