import React, {FC, Fragment} from 'react';
import './App.css';
import Home from './views/home';
import Login from './views/login/index';
import PageC from "./views/pageC";
import UserManage from './views/userManage/index';
import {BrowserRouter, Route} from 'react-router-dom';

const  App: FC = () => {
  return (
    <div className="App">
      <Fragment>
        <BrowserRouter >
          <Route path='/' exact component={Home}></Route>
          <Route path='/login' exact component={Login}></Route>
          <Route path='/pagec' exact component={PageC}></Route>
          <Route path='/userManage' exact component={UserManage}></Route>
        </BrowserRouter>
      </Fragment>
    </div>
  );
}

export default App;
