import React, { useContext, useEffect, useRef } from "react";
import { ModalRegisterContext } from "../../context/context";
import FormRegister from "./form/FormRegister"

const ModalRegister = () => {
    const [openModalRegister, setOpenModalRegister] = useContext(ModalRegisterContext)

    return (
        <div>
            {openModalRegister ?
            <div>
                <FormRegister/>
            </div>
            : null}
        </div>

    )
}

export default ModalRegister