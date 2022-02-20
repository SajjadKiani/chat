import {useTheme} from "../contexts/theme";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {Avatar, Switch} from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import * as React from "react";
import DrawerItem from "./DrawerItem";

export default  function DrawerList ({data,handleChat}) {
    const {darkMode, toggleTheme} = useTheme();

    const handleListClick = (d) => {
        handleChat(d)
    }

    return (
        <div>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant="h6" component="div">
                    SajGram
                </Typography>
                <Switch checked={darkMode === 'dark'} onChange={toggleTheme}/>
            </Toolbar>
            <Toolbar sx={{mb: 1, display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                <Avatar sx={{mb: 1, bgcolor: 'primary.main'}}>
                    S
                </Avatar>
                <Typography>
                    Sajad Kiyani
                </Typography>
                <Typography variant={'caption'}>
                    Skm.kiani@gmail.com
                </Typography>
            </Toolbar>

            <Divider/>

            <List>
                {
                    data.map((d,i) =>
                        <DrawerItem handleChat={handleListClick} key={i} data={d} />
                    )
                }
            </List>

        </div>
    );
}