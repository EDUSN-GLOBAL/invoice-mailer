'use client';
import React, {FC} from 'react';
import {Button, Input, useDisclosure} from "@nextui-org/react";
import {MdSave} from "react-icons/md";
import {Textarea} from "@nextui-org/input";
import Modal__Invoice_Receipt from "#/app/create/_component/Modal-Invoice-Receipt";
import {useAddFileToInstallmentMutation, useSendEmailMutation} from "#/store/query/StudentApi";




interface props {
    email?: string
    sub:string
    fileType?:string
    id: number
    file?: Blob | undefined
}
const SaveAndSend : FC<props> = ({email,sub,id,file,fileType,}) => {
const [EmailFormValues, setEmailFormValues] = React.useState({
    email: email ? email : '',
    sub: sub ? sub : '',
    body: '',
})
    const{
        isOpen, onOpen, onClose,onOpenChange
    }=useDisclosure()
const [sendEmail,{isLoading}] = useSendEmailMutation()
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = new FormData()
        form.append('file', file!)

        form.append('type', 'invoice')
        EmailFormValues.email && form.append('email', EmailFormValues.email)
        EmailFormValues.sub && form.append('subject', EmailFormValues.sub)
      EmailFormValues.body && form.append('body', EmailFormValues.body)

sendEmail({form, id});

    }
    return (
        <div className={'w-full h-full flex justify-around items-center'}>

            <div>
                    <h1 className={'text-3xl font-semibold'} >Sent Invoice </h1>
                <form onSubmit={onSubmit}>
                    {email &&  <Input onChange={(e)=>setEmailFormValues({...EmailFormValues,email:e.target.value})} isRequired  variant={'bordered'} color="secondary" defaultValue={email ? email : ''} label="Email" labelPlacement="outside" placeholder="Enter your email" className="max-w-xs "/>}
                    <Input isRequired defaultValue={sub} variant={'bordered'} color="secondary" label="sub" onChange={(e)=>setEmailFormValues({...EmailFormValues,sub:e.target.value})} labelPlacement="outside" placeholder="Enter your name" className="max-w-xs "/>
                    <Textarea isRequired
                        variant={'bordered'}
                              onChange={(e)=>{
                                  setEmailFormValues({
                                      ...EmailFormValues,
                                      body: e.target.value
                                  })
                              }}
                        classNames={{
                            label:'text-black'
                        }} color="secondary"
                        label="Body"
                        labelPlacement="outside"
                        placeholder="Enter your description"
                        className="max-w-xs "/>
                    <Button type={'submit'}  isLoading={isLoading} className={'bg-blue-500 mt-3'}>Send</Button>
                </form>
            </div>
      <Button className={'bg-blue-500'} onClick={onOpen} endContent={<MdSave size={35}/>}>Save to student folder</Button>

            <Modal__Invoice_Receipt isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} file={file} id={id}/>




        </div>
    );
};

export default SaveAndSend ;

