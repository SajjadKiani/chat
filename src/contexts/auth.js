import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(undefined)

const setLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, value)
    } catch (e) {
        console.error({ e })
    }
}

const getLocalStorage = (key, initialValue) => {
    try {
        const value = localStorage.getItem(key)
        return value ? value : initialValue
    } catch (e) {
        return initialValue
    }
}

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() =>
        getLocalStorage('token', ''),
    )
    useEffect(() => {
        setLocalStorage('token', user)
    }, [user])

    const toggleAuth = (token) => {
        setUser((prev) => token)
    }

    const value = { toggleAuth: toggleAuth, user }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = () => {
    const context = useContext(AuthContext)

    if (context === undefined)
        throw new Error('useAuth must be within AuthProvider!')

    return context
}

export { AuthProvider, useAuth }
