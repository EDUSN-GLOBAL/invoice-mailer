'use client'
import React, { useState } from 'react'

import { Button, Input, Modal, ModalContent, ModalHeader, Select, SelectItem, useDisclosure } from '@nextui-org/react'
import dynamic from 'next/dynamic'
import { useAddFileToInstallmentMutation } from '#/store/query/StudentApi'
import { toast } from 'react-toastify'

const CustomFileManager=dynamic(()=>import('./_component/installmentFiles'),{})
const Page = ({ params }: { params: { installment_id: number } }) => {
  const [file, setFile] = useState<File | undefined>()
  const [fileType, setFileType] = useState('')
  const[postFile,{isLoading}] = useAddFileToInstallmentMutation()
  const onSubmit = async () => {
    if (file && fileType) {
      const form = new FormData();
      form.append('file', file!);
      form.append('type', fileType);
      await postFile({ form, id: params.installment_id })
      onClose()
    } else {
      toast.error('Please select a file and a type')
    }


  }


const {onClose,onOpen,onOpenChange,isOpen}=useDisclosure()
  return (
    <div className=" h-screen">
        <div className="p-4 h-20 flex justify-between">
            <h1 className="text-bold text-2xl">installments</h1>
        {/*   <Button onClick={handleAddInstallment}>create</Button> */}
        <Button onClick={onOpen}>Add Files</Button>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange} isDismissable={false} >

        <ModalContent >

          {(onClose) => (

            <div className='min-h-[30vh] bg-white grid items-stretch p-4'>
              <h1>Upload File</h1>
              <input type='file' multiple={false} onChange={(e) => setFile(e.target.files?.[0])} />
              <h1>Type</h1>
           <Select
      items={fileTypes}
     onChange={(e) => setFileType(e.target.value)}
                placeholder="Select file type"
                variant='underlined'
                className="max-w-xs bg-white text-black"
                // @ts-ignore
                color='black'

    >
      {(fileType) => <SelectItem className='text-white'  variant='bordered' key={fileType.value}>{fileType.label}</SelectItem>}
    </Select>
              <Button isLoading={isLoading} onPress={onSubmit}>Submit</Button>

            </div>
          )}
        </ModalContent>
      </Modal>

        <CustomFileManager id={params.installment_id} />
  </div>
  )
}

export default Page

const fileTypes = [
  {
    value: 'invoice',
    label: 'Invoice'
  }, {
    value: 'receipt',
    label: 'Receipt'
  },
  {
    value: 'Others',
    label: 'Others'
  }
]
