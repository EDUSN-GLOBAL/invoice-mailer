

import React from 'react'


import StudentAutoComplete from '../_component/StudentAutoComplete'

import dynamic from "next/dynamic";
const FileExcel=dynamic(()=> import('../_component/FileExcel'))
const PDFInvoice = dynamic(() => import('../_component/invoiceMaker/PDFInvoice'))
const page = () => {
      /*  const promise = useExcelToJson({ file: file }) */


  return (
    <div className='w-full h-screen  '>
      <div className='flex justify-around p-8'>
     <StudentAutoComplete/>
      <div className='w-1/4'>
    <FileExcel/>
      </div></div>
      <PDFInvoice/>
    </div>
  )
}

export default page
