import React from "react";
import {ThemeProvider} from "@emotion/react";
import {createTheme, Typography} from "@mui/material";
import Yekan from '../asset/font/Iranyekan.ttf'
import {green} from "@mui/material/colors";

const ThemeContext = React.createContext(undefined);

export const useTheme = () => React.useContext(ThemeContext);

const getLocalStorage = (key, initialValue) => {
    try {
        const value = localStorage.getItem(key)
        if (key === 'theme')
            return value ? value : initialValue
        else
            return value ? JSON.parse(value) : initialValue
    } catch (e) {
        return initialValue
    }
}

const setLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, value)
    } catch (e) {
        console.error({ e })
    }
}

export default function MyThemeProvider ({children}) {

    const [darkMode , setDarkMode] = React.useState(getLocalStorage('theme','light'))
    const [color , setColor] = React.useState(getLocalStorage('color',green))

    const toggleTheme = () => {
        setDarkMode(prev => prev === 'dark' ? 'light' : 'dark')
    }

    React.useEffect(() => {
        setLocalStorage('color',JSON.stringify(color))
    },[color])

    React.useEffect(() => {
        setLocalStorage('theme',darkMode)
    },[darkMode])


    const theme = createTheme({
        palette: {
            primary: color,
            mode: darkMode
        },
        typography: {
            fontFamily: 'Yekan, Arial',
            },
        components: {
            MuiCssBaseline: {
              styleOverrides: `
                @font-face {
                  font-family: 'Yekan';
                  src: url(${Yekan}) format('ttf');
                }
              `,
            },
        }
    });

    return (
        <ThemeContext.Provider value={{darkMode , toggleTheme,setColor}}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}