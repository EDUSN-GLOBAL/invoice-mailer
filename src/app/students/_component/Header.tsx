'use client';

import { useDisclosure } from "@nextui-org/react";

import ReusableHeader from "#/component/general/CustomPageHeader";

import CustomStudentForm, { Student, SubmitFormValues, SubmitFunc } from "./CustomStudentForm";
import { useAddStudentMutation } from "#/store/query/StudentApi";

const StudentHeader = () => {

  const { isOpen, onOpen, onOpenChange,onClose } = useDisclosure();
  const [addStudent] = useAddStudentMutation()



 const handleSubmit = async(values: SubmitFormValues) => {

   await addStudent(values);
   onClose();
}
    return (<ReusableHeader title="Student Manager"  onOpen={onOpen}  isOpen={isOpen} onOpenChange={onOpenChange} >

  <CustomStudentForm handleSubmit={handleSubmit} isLoading={false } initialValues={initialValues}/>
  </ReusableHeader>);
};
export default StudentHeader;
   const initialValues :Student = {
       name: '',
       email: '',
       phone: '',
     campus: '',
     year: '',
       academicYear: '',
       intake: '',
       parentName: '',
}
