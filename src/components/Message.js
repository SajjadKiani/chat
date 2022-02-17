import { Paper, Typography} from "@mui/material";
import {useAuth} from "../contexts/auth";

export default function Message ({data}) {

    const color = data.me ? '' : 'primary.main'
    const date = new Date(data.date)
    const time = date.getUTCHours() + ":" + date.getUTCMinutes()
    const direction = data.text[0].match( /[a-zA-Z0-9]/g )

    return (
        <Paper sx={{  display: 'inline-flex',flexDirection: 'column', p: 1,pb: 0, maxWidth: 400, minWidth: 100, flexWrap: 'wrap',borderRadius: 3, bgcolor: color}}>
            <Typography sx={{direction: direction ? '' : 'rtl'}} >
                {data.text}
            </Typography>
            <Typography variant={'caption'} textAlign={'end'} >
                {time}
            </Typography>
        </Paper>
    )
}