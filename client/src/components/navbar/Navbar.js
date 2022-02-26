import React, { useContext, useState, useEffect } from "react";
import DropdownAdmin from "../dropdown/DropdownAdmin";
import DropdownUser from "../dropdown/DropdownUser";
import { Link } from "react-router-dom";
import {
    IsAdminContext,
    IsLoginContext,
    ModalLoginContext,
    ModalRegisterContext
} from "../../context/context";




const Navbar = () => {

    const [isLogin] = useContext(IsLoginContext)
    const [isAdmin] = useContext(IsAdminContext)
    const [openModalRegister, setOpenModalRegister] = useContext(ModalRegisterContext)
    const [openModalLogin, setOpenModalLogin] = useContext(ModalLoginContext)


    return (
        <nav className=" m-auto">
            <div className="navContainer flex items-center justify-between md:w-8/12 md:m-auto md:pt-4">
                <Link to="/">
                    <div className="navLogo">
                        <img src="/images/logo/logo-white.png" alt="" />
                    </div>
                </Link>

                <div>
                    {isLogin ?
                        <>
                            {isAdmin ? <DropdownAdmin/> : <DropdownUser/>}
                        </>
                    :
                        <div className="buttonGroup">
                            <button onClick={()=> setOpenModalLogin(!openModalLogin)} className="md:px-6 md:py-2 border border-red-600 mx-2 rounded font-bold">Login</button>
                            <button onClick={()=> setOpenModalRegister(!openModalRegister)} className="md:px-6 md:py-2 mx-2 bg-red-600 rounded text-white font-bold">Register</button>
                        </div>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar