import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
import { ModalLoginContext, ModalRegisterContext } from "../../../context/context";
import { API } from "../../../config/api";

const FormRegister = () => {
    const [openModalRegister, setOpenModalRegister] = useContext(ModalRegisterContext)
    const [openModalLogin, setOpenModalLogin] = useContext(ModalLoginContext)

    let navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [state, dispatch] = useContext(UserContext);

    // INITIALIZE FORM
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
      });

    const { name, email, password } = form;
    // FOR INPUT
    const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      };

    const handleRegister = async (e) => {
        try {
            // e.preventDefault()

            // Configuration Content-type
            const config = {
                headers: {
                "Content-type": "application/json",
                },
            };

            // Data body
            const body = JSON.stringify(form);

            // Insert data user to database
            const response = await API.post('/register', body, config);

            if (response.data.status == "success") {
                const alert = (
                  <div
                    className="flex items-center bg-green-600 rounded-md text-white text-sm px-4 py-4 my-4"
                    role="alert"
                  >
                    <p>
                      Successfully registered.
                    </p>
                  </div>
                );
                setMessage(alert);
                // setOpenModalRegister(!openModalRegister)
              } else {
                const alert = (
                  <div
                  className="flex justify-center items-center rounded-md text-red-600 border border-red-600 text-sm font-bold px-4 py-3"
                  role="alert"
                >
                  <p>Register Failed. Try Again</p>
                </div>
                );
                setMessage(alert);
              }
            } catch (error) {
              console.log(error);
            }
    }

    return (
        <div className="absolute w-full z-20 flex items-center justify-center top-72">
          <div className="p-20 rounded bg-white">
            <form onSubmit={handleRegister} method="post" action="/" className="formLogin flex flex-col w-11/12 m-auto md:w-96">
            <h3 className="titleLogin text-4xl mb-4 px-1 font-extrabold text-red-strong">Register</h3>

            {message && message}

            <input onChange={handleChange} value={name} name="name" type="text" placeholder="Name" className="w-full mb-4 py-3 px-3 border-2 outline-red-strong border-red-strong rounded bg-red-100"/>

            <input onChange={handleChange} value={email} name="email"type="email" placeholder="Email" className="w-full mb-4 py-3 px-3 border-2 outline-red-strong border-red-strong rounded bg-red-100"/>

            <input onChange={handleChange} value={password} name="password" type="password" placeholder="Password" className="w-full py-3 px-3 border-2 outline-red-strong border-red-strong rounded bg-red-100 mb-6"/>

            {/* <label htmlFor="name">

            </label>

            <label htmlFor="email">

            </label>

            <label htmlFor="password" >

            </label> */}

             <button onClick={handleRegister} type='button' className="p-4 bg-red-strong text-white rounded mb-4 font-bold">Register</button>

            <span className="text-center">Already have account ? <button onClick={() => {setOpenModalLogin(!openModalLogin)
            setOpenModalRegister(!openModalRegister)
            }
            }>Sign In</button></span>



            </form>
          </div>
      </div>
    )
}

export default FormRegister