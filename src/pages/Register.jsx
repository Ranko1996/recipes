import React,{ Fragment, useState } from 'react'
import {Link} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { toast } from 'react-toastify';



const Register = ({setAuth}) => {

    const [inputs, setInputs] = useState({
        email:"",
        password:"",
        name:""
      })

    const {email, password, name} = inputs

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value})
    }

    const onSubmitForm = async(e) => {
        e.preventDefault()
        try {

            const body = {email, password}

            const response = await fetch("http://localhost:3333/auth/signup", {
                method: "POST",
                headers: {"Content-type" : "application/json"},
                body: JSON.stringify(body)
            })

            
            const parseRes = await response.json()
            if(parseRes.access_token){
              localStorage.setItem('access_token', parseRes.access_token)
              setAuth(true)
              toast.success("Register Successfully")
            } else {
              toast.error(parseRes.message)
              setAuth(false)
            }

            console.log(parseRes)

        } catch (error) {
            console.error(error.message)
        }
    }

  return (
    <Fragment>

    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={onSubmitForm} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                required
                fullWidth
                label="Name"
                autoFocus
                value={name}
                onChange={e => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                required
                type="email"
                fullWidth
                label="Email Address"
                value={email}
                onChange={e => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={e => onChange(e)}
              />
            </Grid>
            
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Grid item>
              <Link style={{color: "#0c5ec2"}} to="/login" >
                {"Already an user? Login"}
              </Link>
            </Grid>
        </Box>
      </Box>
    </Container>
  </Fragment>
  )
}

export default Register