import {AppBar, Button, Grid, Toolbar, Typography} from "@mui/material";
import React from "react";
import {blue} from "@mui/material/colors";

export default function Navbar () {
    return (
            <Grid display={'flex'} justifyContent={'space-between'} p={3}>

                <Typography variant={'h6'} >
                    SajGram
                </Typography>

                <Grid display={'flex'} gap={2}>
                    <Button color={'info'} >Home</Button>
                    <Button color={'info'} >App</Button>
                </Grid>

                <Button color={'info'} sx={{ borderRadius: 16 }} variant={'outlined'}>Login</Button>
            </Grid>
    )
}