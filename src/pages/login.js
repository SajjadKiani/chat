import * as React from "react";

import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    Link,
    Paper,
    Switch,
    TextField,
    Typography
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import {Link as RouteLink, useHistory} from 'react-router-dom';
import {useForm} from "react-hook-form";
import {useAuth} from "../contexts/auth";
import {LoginAPI} from "../services/api";

export default function Login () {


    const {register,handleSubmit , formState: {errors}} = useForm()
    const history = useHistory()
    const {toggleAuth} = useAuth()

    const onSubmit = (data) => {
        LoginAPI(data)
            .then((res) => {
                toggleAuth(res.data.token)
            })
            .catch((err) => {
                console.log(err)
            })
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
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 5 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
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
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                size={'small'}
                                {...register('password', {
                                    required: 'password required'
                                })}
                            />
                            <Grid display={'flex'} justifyContent={'center'} >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                            </Grid>
                            <Grid display={'flex'} mt={2} justifyContent={'center'} >
                                <Typography variant={'body2'} >
                                    Need an account? <Link underline={'none'} component={RouteLink} to={'/signup'}>Signup</Link>
                                </Typography>
                            </Grid>


                        </Box>
                    </Box>
                </Container>
            </Grid>
        </Grid>
    );
}