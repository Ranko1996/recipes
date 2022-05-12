import React, {useState} from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Link} from 'react-router-dom'
import Grid from '@mui/material/Grid';
import { toast } from 'react-toastify';

const Login = ({setAuth}) => {

  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  })  

  const {email, password} = inputs

  const onChange = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value})
  }

  const onSubmitForm = async(e) => {
    e.preventDefault()
    try {

      const body = {email, password}

      const response = await fetch('http://localhost:3333/auth/signin', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
      })
    
      const parseRes = await response.json()
      console.log(parseRes)
      if(parseRes.access_token) {
        localStorage.setItem('access_token', parseRes.access_token)
        setAuth(true)
        toast.success("login succesfull")
      } else {
        toast.error("Credentials incorrect")
        setAuth(false)
      }
      
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
  
 
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
       
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box component="form" onSubmit={onSubmitForm} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              type="email"
              label="Email Address"
              name="email"
              autoFocus
              value={email}
              onChange={e => onChange(e)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="password"
              label="Password"
              name="password"
              value={password}
              onChange={e => onChange(e)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid item>
                <Link style={{color: "#0c5ec2"}} to="/register">
                  {"Don't have an account? Register"}
                </Link>
              </Grid>
          </Box>
        </Box>
      </Container>
 
 

  )
}

export default Login