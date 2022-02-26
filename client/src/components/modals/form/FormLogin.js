import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IsAdminContext, IsLoginContext, ModalLoginContext } from "../../../context/context";
import { API } from "../../../config/api";
import { UserContext } from "../../../context/userContext";

const FormLogin = () => {
    let navigate = useNavigate

    const [isLogin, setIsLogin] = useContext(IsLoginContext)
    const [isAdmin, setIsAdmin] = useContext(IsAdminContext)

    const [openModalLogin, setOpenModalLogin] = useContext(ModalLoginContext)
    const [state, dispatch] = useContext(UserContext);


    const [form,setForm] = useState({
        email: "",
        password: ""
      })

      const { email, password } = form;

      const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      };

      const handleLogin = async (e) => {
        try {
          e.preventDefault()

          // Configuration Content-type
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };

          // Data body
          const body = JSON.stringify(form);

          // Insert data user to database
          const response = await API.post('/login', body, config);

          // Checking process
        if (response?.status === 200) {
          // Send data to useContext
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: response.data.user.data
          });

          // Status check
          if (response.data.user.data.status === "admin") {
            // navigate("/");
            setIsLogin(!isLogin)
            setIsAdmin(!isAdmin);
            setOpenModalLogin(!openModalLogin)
            // console.log(response);
          } else {
            // navigate("/");
            setIsLogin(!isLogin)
            setIsAdmin(false);
            setOpenModalLogin(!openModalLogin)
          }
        }

        } catch (error) {
          console.log(error);
        }
      }

    return (
        <div className="absolute w-full z-20 flex items-center justify-center top-72 ">
          <div className="p-20 rounded bg-white">
            <form className="formLogin flex flex-col w-11/12 m-auto md:w-96">
                <h3 className="titleLogin text-4xl mb-4 px-1 font-extrabold text-red-strong">Login</h3>

                <input onChange={handleChange} value={email} name='email' type="email" placeholder="Email" className="w-full mb-4 py-3 px-3 border-2 outline-red-strong border-red-strong rounded bg-red-100"/>

                <input onChange={handleChange} value={password} name="password" type="password" placeholder="Password" className="w-full py-3 px-3 border-2 outline-red-strong border-red-strong rounded bg-red-100 mb-6"/>


                <button onClick={handleLogin} type='button'
                className="p-4 bg-red-strong text-white rounded mb-4 font-bold">Login</button>
                <span className="text-center">Don't have an account ? <button>Sign Up</button></span>
            </form>
            </div>
        </div>
    )
}

export default FormLogin