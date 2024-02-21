'use client';
import { Button, Input } from '@nextui-org/react'
import React, { useEffect } from 'react'
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import { useLoginMutation } from '#/store/query/generalApi';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';


   const initialValues = {
    email: '',
    password: ''
}

const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation();

  const router = useRouter()


  return (
    <div className="max-h-max  w-1/3 mx-auto  bg-gray-200 rounded-md
    bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 border border-gray-100">
      <h1 className='text-center text-4xl text-[#0e1129]'>LoginForm</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => handleSubmit(values, router,login)}>
        {(props) => {
          return (
            <Form className='flex flex-col p-4 h-[35vh]  justify-between flex-wrap  '>
              <div>
              <Input type="email" label="Email" name='email' value={props?.values?.email} onChange={props?.handleChange} onBlur={props?.handleBlur}
                color={props?.errors?.email && props.touched.email ? 'danger' : 'default'}
              />
              {props?.errors?.email && props.touched.email && <p className='text-red-500'>{props?.errors?.email}</p>}</div>
             <div> <Input type="password" label="Password" name='password' value={props?.values?.password}
                onChange={props?.handleChange} onBlur={props?.handleBlur}
                color={props?.errors?.password && props.touched.password ? 'danger' : 'default'}
              />
                {props?.errors?.password && props.touched.password && <p className='text-red-500'>{props?.errors?.password}</p>}
                </div>
        <Button className='bg-[#0e1129]' type='submit' isLoading={isLoading} >Submit</Button>
      </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default LoginForm

export const validationSchema = Yup.object({
  email: Yup.string().required('email is required'),
  password: Yup.string().required('password is required'),

})
export type LoginFormValues = Yup.InferType<typeof validationSchema>
export type LoginFormProps = {
  onSubmit: (values: LoginFormValues) => void
}
export const handleSubmit = async(values: LoginFormValues,router: AppRouterInstance,login: LoginFunction) => {

  try {
    await login(values);
    router.push('/');
    router.refresh();

  } catch (error) {
    console.log(error)

  }
}

// Example type definition (replace this with your actual type)
type LoginFunction = (values: LoginFormValues) => Promise<any>;
