import React, {useContext, useEffect} from "react";
import ModalRegister from "./components/modals/ModalRegister";
import ModalLogin from "./components/modals/ModalLogin";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePages";
import AddProduct from "./pages/AddProduct"
import AddTopping from "./pages/AddTopping"
import Cart from "./pages/Cart"
import Transaction from "./pages/TransactionTable"
import ProfilePage from "./pages/ProfilePage";
import {API, setAuthToken} from "./config/api"
import { useNavigate } from "react-router-dom";
import { IsAdminContext, IsLoginContext } from "./context/context";
import { UserContext } from "./context/userContext";
import ProductDetail from "./pages/ProductDetail"

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const [state, dispatch] = useContext(UserContext)
  const [isLogin, setIsLogin] = useContext(IsLoginContext)
  const [isAdmin, setIsAdmin] = useContext(IsAdminContext)

  let navigate = useNavigate()


  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    // Redirect Auth
    if (!state.isLogin) {
      setIsLogin(false);
      navigate("/");
    } else {
      setIsLogin(true);
      if (state.user.status === "admin") {
        navigate("/");
        setIsAdmin(true);
      } else if (state.user.status === "customer") {
        navigate("/");
        setIsAdmin(false);
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.post("/check-auth");

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data.user;
      // console.log(payload);
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);


  return (
    <div className="wrap">
      <Navbar/>
      <ModalRegister/>
      <ModalLogin/>

      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/add-product" element={<AddProduct/>}/>
        <Route path="/add-topping" element={<AddTopping/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/transaction" element={<Transaction/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/detail/:id" element={<ProductDetail/>}/>
      </Routes>
    </div>

  )
}

export default App