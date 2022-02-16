import React from "react";
import {ThemeProvider} from "@emotion/react";
import {createTheme} from "@mui/material";
import {blue, green, lightGreen, orange, purple, red} from "@mui/material/colors";

const ThemeContext = React.createContext(undefined);

export const useTheme = () => React.useContext(ThemeContext);

export default function MyThemeProvider ({children}) {

    const [darkMode , setDarkMode] = React.useState('light')

    const toggleTheme = () => {
        setDarkMode(prev => prev === 'dark' ? 'light' : 'dark')
    }

    const theme = createTheme({
        palette: {
            primary: green,
            mode: darkMode
        }
    });

    return (
        <ThemeContext.Provider value={{darkMode , toggleTheme}}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}