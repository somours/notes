import React, {FC, Fragment} from 'react';
import './App.css';
import Home from './views/home';
import Login from './views/login/index';
import PageC from "./views/pageC";
import UserManage from './views/userManage/index';
import {BrowserRouter, Route} from 'react-router-dom';

const ThemeContext = React.createContext('light')

const  App: FC = () => {
  return (
    <div className="App">
      <ThemeContext.Provider value="dark">
        <Fragment>
          <BrowserRouter >
            <Route path='/' exact component={Home}></Route>
            <Route path='/login' exact component={Login}></Route>
            <Route path='/pagec/:id' component={PageC}></Route>
            <Route path='/userManage' component={UserManage}></Route>
          </BrowserRouter>
        </Fragment>
      </ThemeContext.Provider>


    </div>
  );
}

export default App;
