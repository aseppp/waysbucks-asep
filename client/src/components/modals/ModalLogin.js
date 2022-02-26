import React, { useContext, useEffect, useRef } from "react";
import { ModalLoginContext, ModalRegisterContext } from "../../context/context";
import FormLogin from "./form/FormLogin"

const ModalLogin = () => {
    const [openModalLogin, setOpenModalLogin] = useContext(ModalLoginContext)

    return (
        <div>
            {openModalLogin ?
            <div>
                <FormLogin/>
            </div>
            : null}
        </div>

    )
}

export default ModalLogin