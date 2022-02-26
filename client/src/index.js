import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./index.css"
import { BrowserRouter } from "react-router-dom";
import { IsAdmin, IsLogin, ModalLogin, ModalRegister } from './context/context';
import { UserContextProvider } from './context/userContext';

ReactDOM.render(
  <IsLogin>
    <IsAdmin>
      <BrowserRouter>
        <ModalRegister>
          <ModalLogin>
            <UserContextProvider>
              <App />
            </UserContextProvider>
          </ModalLogin>
        </ModalRegister>
      </BrowserRouter>
    </IsAdmin>
  </IsLogin>
  ,
  document.getElementById('root')
);
