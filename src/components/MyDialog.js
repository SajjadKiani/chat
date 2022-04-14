import React from 'react'
import {
    Avatar,
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, IconButton,
} from "@mui/material";
import {Colors} from "../color";
import {useTheme} from "../contexts/theme";

export default function MyDialog({show , setShow}) {

    const {setColor} = useTheme()

    const handleClose = ( ) => setShow(false)

    const changeColor = (color) => setColor(color)

  return (
    <Dialog open={show} onClose={handleClose}>
        <DialogTitle>Theme</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select theme color
          </DialogContentText>

            <Card sx={{p: 3,m: 3,mb: 0}}>
                {Colors.map((d,i) =>
                    <IconButton key={i} onClick={() => changeColor(d)} >
                        <Avatar sx={{bgcolor: d[500]}} > </Avatar>
                    </IconButton>
                )}
            </Card>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
  )
}
