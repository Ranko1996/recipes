import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaPizzaSlice } from 'react-icons/fa'
import { GiNoodles, GiChopsticks, GiHamburger } from 'react-icons/gi'
import styled from 'styled-components'


const Category = () => {
  return (
    <List>
        <LinkNav to={'/cuisine/Italian'}>
            <FaPizzaSlice />
            <h4>Italian</h4>
        </LinkNav>
        <LinkNav to={'/cuisine/American'}>
            <GiHamburger />
            <h4>American</h4>
        </LinkNav>
        <LinkNav to={'/cuisine/Thai'}>
            <GiNoodles />
            <h4>Thai</h4>
        </LinkNav>
        <LinkNav to={'/cuisine/Japanese'}>
            <GiChopsticks />
            <h4>Japanese</h4>
        </LinkNav>
    </List>
  )
}

const List = styled.div`
    display: flex;
    justify-content: center;
    margin: 2rem 0rem;
`

const LinkNav = styled(NavLink)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-right: 2rem;
    text-decoration: none;
    background: linear-gradient(35deg, #494949, #313131);
    width: 6.3rem;
    height: 6.3rem;
    cursor: pointer;
    transform: scale(0.8);

    h4{
        color: white;
        font-size: 1rem;
    }
    svg {
        color: white;
        font-size: 2.5rem;
    }
    &.active{
        background: linear-gradient(to right, #f27121, #e94057);
    }
`

export default Category
