import React from "react";
import {BrowserRouter, Route} from 'react-router-dom';
import Login from '../pages/login/index';
// import Home from '../pages/home/index';
import AppLayoutLayout from '../components/layout/index';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={AppLayoutLayout}></Route>
      <Route path="/login" component={Login}></Route>
      {/*<Route path="/layout/" component={AppLayoutLayout}></Route>*/}
    </BrowserRouter>
  )
}

export default AppRouter
