import * as React from "react";

import {Avatar, Box, Button, Container, CssBaseline, Grid, Link, Paper, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {Link as RouteLink, useHistory} from "react-router-dom";
import {useAuth} from "../contexts/auth";
import {useForm} from "react-hook-form";
import {SignupAPI} from "../services/api";

export default function Signup () {

    const {register,handleSubmit , formState: {errors}} = useForm()
    const history = useHistory()

    const onSubmit = (data) => {
        if (data['password'] === data['password_confirm'] ){
            SignupAPI(data)
                .then((res) => {
                    history.push('/login')
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    return (
        <Grid
            display={'flex'}
            flexDirection={'column'}
            sx={{height: '100vh'}}
        >

            <Grid
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                sx={{flexGrow: 1}}
            >
                <Container sx={{p: 3,m: 1}} component={Paper} maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 5 }}>
                            <Grid display={'flex'} gap={1}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    name="firstName"
                                    autoFocus
                                    size={'small'}
                                    {...register('first_name')}
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="LastName"
                                    autoFocus
                                    size={'small'}
                                    {...register('last_name')}
                                />
                            </Grid>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoFocus
                                size={'small'}
                                {...register('username', {
                                    required: 'username required'
                                })}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoFocus
                                size={'small'}
                                {...register('email', {
                                    required: 'email required'
                                })}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                size={'small'}
                                {...register('password', {
                                    required: 'password required'
                                })}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password confirm"
                                type="password"
                                id="passwordconf"
                                size={'small'}
                                {...register('password_confirm', {
                                    required: 'password confirm required'
                                })}
                            />
                            <Grid display={'flex'} justifyContent={'center'} >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign Up
                                </Button>
                            </Grid>
                            <Grid display={'flex'} mt={2} justifyContent={'center'} >
                                <Typography variant={'body2'} >
                                    Already have an account? <Link underline={'none'} component={RouteLink} to={'/login'}>Sign In</Link>
                                </Typography>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </Grid>
        </Grid>
    );
}