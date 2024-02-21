import dynamic from 'next/dynamic';
import React from 'react'
const LoginForm=dynamic(()=>import('./components/LoginForm'),{})
const Login = async() => {  

  return (
      <div className='min-h-screen flex items-center'>
         <LoginForm/>
    </div>
  )
}
export default Login;
