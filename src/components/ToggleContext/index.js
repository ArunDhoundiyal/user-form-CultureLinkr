import {useState, createContext} from 'react'

export const  ToggleContext = createContext()

export const ToggleContextProvider = ({children}) => {
    const [toggle, setToggle] = useState(false)
    return(
        <ToggleContext.Provider value={{toggle, setToggle}} >{children}</ToggleContext.Provider>

    )
}