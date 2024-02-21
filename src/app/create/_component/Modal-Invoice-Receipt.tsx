import React, {FC} from 'react';
import {Button, Modal, ModalBody, ModalContent, ModalHeader} from "@nextui-org/react";
import {useAddFileToInstallmentMutation, useGetAllInstallmentsByStudentIdQuery} from "#/store/query/StudentApi";
import {toast} from "react-toastify";
interface props {


    isOpen: boolean;
    onOpenChange:()=>void;
    onClose:()=>void
    id?:number
    file?:Blob
}
const Modal__Invoice_Receipt:FC<props> = ({isOpen,onOpenChange,onClose,file,id}) => {
    const {data}=useGetAllInstallmentsByStudentIdQuery({id})
   const [saveFile]=useAddFileToInstallmentMutation()
    const uploadFile = async (installment_id: number) => {
            const form = new FormData();
            form.append('file', file!);
            form.append('type', 'invoice');
            await saveFile({ form, id: installment_id })
            }
    return (
  <Modal isOpen={isOpen}   onOpenChange={onOpenChange}  >
      <ModalContent className={'bg-white'}>
          {(onClose)=> (
              <>
                  <ModalHeader className={'text-black'}>Invoice Receipt</ModalHeader>
                  <ModalBody className={'grid grid-cols-2 gap-6'} >
                      {data?.length===0 && <h1>No data found</h1>}
                      {data?.map((item,index)=>{
                          return (
                              <div  key={index} className={'flex items-center py-2 justify-around border-b-1 hover:bg-gray-200 cursor-pointer'}>
                               <h1>{item.name}</h1>
                                  <Button onClick={()=>uploadFile(item?.id)}>Save here</Button>
                              </div>
                          )
                      })}
                  </ModalBody>
              </>
          )}
      </ModalContent>
  </Modal>
    );
};
export default Modal__Invoice_Receipt;
