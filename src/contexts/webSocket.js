import {createContext, useContext, useState} from "react";
import {wsAPI} from "../services/api";
import {useAuth} from "./auth";

const SocketContext = createContext(undefined)

export const useSocket = () => useContext(SocketContext)

export default function SocketProvider ({children}) {

    const {user} = useAuth()
    const [socket , setSocket] = useState(wsAPI(user))

    return (

        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}