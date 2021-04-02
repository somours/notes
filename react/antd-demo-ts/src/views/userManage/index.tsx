import React, {FC} from "react";
import {Route} from 'react-router-dom';
import UserList from './userList';

const userManage: FC = () => {
  return (
      <div>
        <p>我是用户管理页面</p>
        <Route path="/userManage/userList" component={UserList}></Route>
      </div>
  )
}

export default userManage
