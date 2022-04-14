import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {AttachFile, MoreVert, Send} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {Chip, CircularProgress, Grid, Stack, TextField} from "@mui/material";
import Message from "./components/Message";
import DrawerList from "./components/DrawerList";
import {MessageListAPI, UsersListAPI } from "./services/api";
import {useAuth} from "./contexts/auth";
import {useSocket} from "./contexts/webSocket";
import { useHistory } from 'react-router-dom';
import MyDialog from "./components/MyDialog";

const drawerWidth = 340;
// let socket = ''

function App (props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const {user} = useAuth()
    const [usersList , setUsersList] = React.useState([])
    const [messageList , setMessageList] = React.useState([])
    const [messageValue , setMessageValue] = React.useState('')
    const [showMessageBar , setShowMessageBar] = React.useState(false)
    const {socket} = useSocket()
    const [direction , setDirection] = React.useState(true);
    const [title , setTitle] = React.useState('Connecting...')
    const [loading , setLoading] = React.useState(true)
    const history = useHistory()
    const [show , setShow ] = React.useState(false)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    function sortFunc ( a , b ) {
        return new Date(a.date) - new Date (b.date)
    }

    const sortListByDate = () =>
        [...messageList].sort(sortFunc)



    const handleChat = (data) => {
        setTitle(data.username)
        socket.send(JSON.stringify({data: data.username,operation: 'chat'}));

        setShowMessageBar(true)
        MessageListAPI(user,data.username)
            .then((res) => {
                setMessageList(JSON.parse(res.data['receiver_message']).map(i => i.fields))
                setMessageList(prev => prev.concat(JSON.parse(res.data['sender_message']).map(i => i.fields).map(i => ({...i,me: true}))  ))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function keyPress(e){
        if(e.keyCode == 13){
            handleSendMessage();
        }
    }

    React.useEffect(() => {

        // usersList
        UsersListAPI(user)
            .then((res) => {
                setUsersList(JSON.parse(res.data).map(i => i.fields))
            })
            .catch((err) => {
                console.log(err)
                if (err.response.status === 401 )
                    history.push('/login')
            })

        socket.onopen = function(event) {
            console.log('open:');
            console.log(event);

            setTitle('')
            setLoading(false)
        }

        socket.onmessage = function(event) {
            const message = event.data;

            setMessageList(prev => [...prev,JSON.parse(message)])
        }


        socket.onerror = function (event) {
            console.log('event')
            console.log(event)
        }

        socket.onclose = function (event) {
            console.log('close:')
            console.log(event)

            setTitle('Connecting...')
            setLoading(true)
        }

        return () => {
            socket.close(1000,'work end!')
        }

    },[])

    const handleMessageValue = (val) => {
        setMessageValue(val)
        setDirection(val[0].match( /[a-zA-Z0-9]/g) )
    }

    const handleSendMessage = () => {
        const newMessage = {
            text: messageValue,
            date: Date.now(),
            me: true,
        }
        setMessageList(prev => [...prev,newMessage])
        socket.send(JSON.stringify({data: messageValue,operation: 'send'}));

        setMessageValue('')
    }

    return (
        <Box sx={{ display: 'flex' }} >
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar sx={{display: 'flex',justifyContent: 'space-between'}} >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {loading && <CircularProgress color={'inherit'} sx={{mx: 2}} />}
                        {title}
                    </Typography>
                    <IconButton onClick={() => setShow(true)} ><MoreVert /></IconButton>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    <DrawerList data={usersList} handleChat={handleChat}/>
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    <DrawerList data={usersList} handleChat={handleChat} />
                </Drawer>
            </Box>


            <Grid sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } , height: '100vh',
                display: !showMessageBar ? 'flex' : 'none',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Chip label="select a chat to start messaging" />
            </Grid>

            <Grid
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } , height: '100vh',
                display: showMessageBar ? 'flex' : 'none',
                flexDirection: 'column',
                }}
            >
                <Toolbar />
                <Stack
                    display={'flex'}
                    flexDirection={'column-reverse'}
                    gap={3}
                    sx={{flexGrow: 1,mb: 1,p: 2}}
                    overflow={'auto'}
                >
                    {
                        // messageList
                        sortListByDate().reverse().map((data,i) =>
                            <Grid display={'flex'} key={i} flexDirection={'row'} justifyContent={data.me ? 'flex-end' : 'flex-start'}>
                                <Message data={data} />
                            </Grid>
                        )
                    }
                </Stack>

                <Grid display={'flex'} gap={2} >
                    <TextField
                        variant={'outlined'}
                        label={'massage'}
                        sx={{flexGrow: 1}}
                        value={messageValue}
                        onChange={(e) => handleMessageValue(e.target.value)}
                        dir={ direction ? '' : 'rtl'}
                        onKeyDown={(e) => keyPress(e)}
                    />
                    <IconButton component={'label'}>
                        <input type="file" hidden  />
                        <AttachFile />

                    </IconButton>
                    <IconButton onClick={handleSendMessage}>
                        <Send />
                    </IconButton>

                </Grid>

            </Grid>

            <MyDialog show={show} setShow={setShow} />

        </Box>
    );
}

export default App;
