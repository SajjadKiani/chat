import ListItem from "@mui/material/ListItem";
import {Avatar, ListItemAvatar} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

export default function DrawerItem ({data,handleChat}) {

    const handleClick = () => {
        handleChat(data)
    }

    return (
        <>
        <ListItem button onClick={handleClick} alignItems="center">
            <ListItemAvatar>
                <Avatar sx={{mb: 1, bgcolor: 'primary.main'}} alt={data.username} src={'image'} />
            </ListItemAvatar>
            <ListItemText
                primary={data.username}
                secondary={
                    <React.Fragment>
                        message
                    </React.Fragment>
                }
            />
        </ListItem>
        </>
    )
}