'use client';
import { Button, Input } from '@nextui-org/react'
import React, {  } from 'react'
import * as Yup from 'yup';
import { Formik, Form } from 'formik';





const CustomStudentForm = ({handleSubmit,isLoading ,initialValues}: {handleSubmit: (values: Student) => void,isLoading:boolean,initialValues:Student}) => {



  return (
    <div className="  w-full mx-auto   bg-gray-200 rounded-md
    bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 border border-gray-100">

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => handleSubmit(values)}>
        {(props) => {
          return (
            <Form className=' p-4   justify-between flex-wrap  '>
              <div className='grid grid-cols-2 gap-2'>
                      {StudentSampleReq.map((item) => (

             <div key={item.field} className='mb-4'>
               <label htmlFor={item.field} className='text-[#0e1129]'>{item.label}</label>
                          <Input
                            autoComplete={"off"}

                            defaultValue={initialValues[item.field as keyof Student]}
                            onChange={props.handleChange}
                            name={item.field}                                  id={item.field} />
                    <p className='text-red-500'>{props.errors[item.field as keyof Student]}</p>



             </div>
           ))}
                </div>
        <Button className='bg-[#0e1129]' type='submit' isLoading={isLoading} >Submit</Button>
      </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default CustomStudentForm

export const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  campus: Yup.string().required('Campus is required'),
  intake: Yup.string().required('Intake is required'),
  year: Yup.string().required('Year is required'),
  academicYear: Yup.string().required('Academic Year is required'),
    parentName: Yup.string().required('Parent Name is required'),


})
export type SubmitFormValues = Yup.InferType<typeof validationSchema>
export type Submit_Props = {
  onSubmit: (values: SubmitFormValues) => void
}

 export type Student = {
  name: string;
  email: string;
  phone: string;
  campus: string;
   intake: string;
   academicYear: string;
  year: string;
  parentName: string;
}
export const StudentSampleReq = [{
  field: 'name',
  label: 'Name',

},
{
  field: 'email',
  label: 'Email',

  },
{
  field: 'phone',
  label: 'Phone',


  }
  , {
    field: 'campus'
    , label: 'Campus'

  }
  , {
    field: 'year'
    , label: 'Year'
  }
  , {
    field: 'intake'
    , label: 'Intake'
  }, {
    field: 'academicYear'
    , label: 'Academic Year'
  }
  , {
    field: 'parentName'
    , label: 'Parent Name'
  }
]
export type SubmitFunc = (values: SubmitFormValues) => Promise<any>;
