
import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom';
import { HistoryRouter as Router } from "redux-first-history/rr6";
import { ToastContainer } from 'react-toastify';

import { history } from './redux/configureStore';

import 'react-toastify/dist/ReactToastify.css';
import './scss/style.scss';

//conatiners
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

//pages
const Login = React.lazy(() => import('./components/auth/Login'));
const ForgotPassword = React.lazy(() => import('./components/auth/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./components/auth/ResetPassword'));



function App() {

  return (
    <>
      <Router history={history}>
        <Suspense fallback={<></>}>
          <Routes>
              <Route exect path="/auth/login" name="Login" element={<Login/>}/>
              <Route exact path="/auth/forgot-password" name="Forgot password" element={<ForgotPassword/>} />
              <Route exact path="/auth/reset-password/:token" name="Reset password" element={<ResetPassword/>} />
              {/* <Route exact path="/404" name="Page 404" element={<Page404 />} />
              <Route exact path="/500" name="Page 500" element={<Page500 />} /> */}
              <Route path="*" name="Home" element={<TheLayout history={history}/>} />
          </Routes>
        </Suspense>
      </Router>
      <ToastContainer icon={false} hideProgressBar={true} autoClose={5000} theme={"colored"} position={"bottom-right"}/>
    </>
  );
}

export default App;
