import { Paper, Typography} from "@mui/material";
import {useAuth} from "../contexts/auth";

export default function Message ({data}) {

    const color = data.me ? '' : 'primary.main'

    return (
        <Paper sx={{ display: 'inline-flex',flexDirection: 'column', p: 1,pb: 0, maxWidth: 400, minWidth: 100, flexWrap: 'wrap',borderRadius: 3, bgcolor: color}}>
            <Typography>
                {data.text}
            </Typography>
            <Typography variant={'caption'} textAlign={'end'} >
                {data.date.split('T')[1].slice(0,5)}
            </Typography>
        </Paper>
    )
}