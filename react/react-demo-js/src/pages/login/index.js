import React, {useState} from "react";
import {Form, Input, Button, Checkbox, message} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.less'

const initialForm = {
  username: 'admin',
  password: '123456'
}
const Login = (props) => {

  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  // 原生表单提交
  const onFinish = (value) => {
    console.log('form', value)
  }
  // 点击登录验证表单内容
  const login = async () => {
    console.log(form)
    setLoading(true)
    const timer = setTimeout(async () => {
      const postForm = await form.validateFields()
      const flag = Object.entries(initialForm).every(([key, value]) => {
        return postForm[key] === value
      })
      clearTimeout(timer)
      setLoading(false)
      if(flag) {
        props.history.push('/')
      } else {
        message.error('账号或者密码错误')
      }
      console.log('postForm', postForm)
    }, 2000)

  }


  return (
    <Form
      name="normal_login"
      className="login-form"
      form={form}
      onFinish={onFinish}
      initialValues={initialForm  }
    >
      <Form.Item name="username" rules={[{required: true, message: '请输入用户名'}]}>
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入"></Input>
      </Form.Item>
      <Form.Item name="password" rules={[{required: true, message: '请输入密码'}]}>
        <Input type="password" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入"></Input>
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox >Remember me</Checkbox>
        </Form.Item>
        <a href="" className="login-form-forgot">忘记密码</a>
      </Form.Item>
      <Form.Item>
        <Button type="primary" className="login-form-button"  loading={loading} onClick={login}>登录</Button>
        Or <a href="" >注册</a>
      </Form.Item>
    </Form>
  )
}
export default Login
