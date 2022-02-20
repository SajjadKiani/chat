import React from 'react'
import { Grid, Container} from "@mui/material";
import Navbar from "../components/Navbar";

export default function Home () {
    return (
        <Container display={'flex'} flexDirection={'column'} height={'100vh'}>
            <Navbar />
            <Grid flexGrow={1}>

            </Grid>
        </Container>
    )
}