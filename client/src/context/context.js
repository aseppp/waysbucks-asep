import React, { createContext, useState } from "react";

// IS LOGIN CONTEXT
export const IsLoginContext = createContext()
export const IsLogin = ({children}) => {
    const [isLogin, setIsLogin] = useState(false)

    return (
        <IsLoginContext.Provider value={[isLogin, setIsLogin]}>
            {children}
        </IsLoginContext.Provider>
    )
}

// IS ADMIN CONTEXT
export const IsAdminContext = createContext()
export const IsAdmin = ({children}) => {
    const [isAdmin, setIsAdmin] = useState(false)

    return (
        <IsAdminContext.Provider value={[isAdmin, setIsAdmin]}>
            {children}
        </IsAdminContext.Provider>
    )
}

// MODAL REGISTERCONTEXT
export const ModalRegisterContext = createContext()
export const ModalRegister = ({children}) => {
    const [openModalRegister, setOpenModalRegister] = useState(false)

    return (
        <ModalRegisterContext.Provider value={[openModalRegister, setOpenModalRegister]}>
            {children}
        </ModalRegisterContext.Provider>
    )
}

// MODAL LOGIN CONTEXT
export const ModalLoginContext = createContext()
export const ModalLogin = ({children}) => {
    const [openModalLogin, setOpenModalLogin] = useState(false)

    return (
        <ModalLoginContext.Provider value={[openModalLogin, setOpenModalLogin]}>
            {children}
        </ModalLoginContext.Provider>
    )
}