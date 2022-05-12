import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Category from "./components/Category";
import Search from "./components/Search";
import Pages from "./pages/Pages";
import styled from "styled-components"
import { Link } from "react-router-dom"
import logo from "./images/logo.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Link to="/">
        <Logo>
          <LogoImg src={logo} alt=""/>
        </Logo>
        </Link>
        <Pages />
      </BrowserRouter>
    </div>
  );
}

const LogoImg = styled.img`
  height: 8rem;
  width: 10rem;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2rem;
  margin-top: 2rem;
`

const Logo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export default App;
