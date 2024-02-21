
import React from 'react'
import CustomFileManager from '#/app/installments/_components/CustomFileManager'

import FileManagerHeader from '#/app/installments/_components/Header'

const page = () => {
  return (
    <div className='w-full h-[100vh]  overflow-hidden p-4'>
     <FileManagerHeader/>

    <CustomFileManager/>
    </div>
  )
}

export default page
