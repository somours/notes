import React, {FC} from "react";
import {BrowserRouter, Route} from 'react-router-dom';
import UserList from './userList';

const userManage: FC = () => {
  return (
      <div>
        <p>我是用户管理页面</p>
        <BrowserRouter>
          <Route path='userList' component={UserList}></Route>
        </BrowserRouter>
      </div>
  )
}

export default userManage
