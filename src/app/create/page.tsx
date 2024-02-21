import React from 'react'

import ReceiptMaker, {InvoiceMaker, MailMaker} from './_component/ReceiptMaker/ReceiptMaker'


const page = async() => {

  return (
    <div className=' p-8 h-full '>
      <h1 className='text-3xl font-bold '>Tools</h1>
    <div className='h-full flex justify-around items-center'>
      <InvoiceMaker />
        <ReceiptMaker/>
        <MailMaker/>
    </div></div>
  )
}

export default page
