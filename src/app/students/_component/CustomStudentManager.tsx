// CustomStudentManager.tsx
'use client';
import CustomModal from '#/component/general/CustomModal';
import CustomTable from '#/component/general/CustomTable';
import { useGetAllStudentsQuery, useUpdateStudentMutation } from '#/store/query/StudentApi';
import { Button, Modal, ModalBody, ModalContent, ModalHeader, Tooltip, useDisclosure } from '@nextui-org/react';
import CustomStudentForm, { Student } from './CustomStudentForm';
import { useEffect, useState } from 'react';
import CustomPagination from '#/component/general/CustomPagination';
import {useAppSelector} from "#/store/storeHooks";



interface StudentData extends Student {
  id: number;
  totalPages: number;



  actions: React.ReactNode;
}
/* type props = {
  onOpen: () => void;
  onClose: () => void;
} */
  const columns = [
    { key: 'name', label: 'Student Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'campus', label: 'Campus', sortable: true },
    { key: 'year', label: 'year', sortable: true },
    { key: 'intake', label: 'Intake', sortable: true },
    { key: 'academicYear', label: 'Academic Year', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false },
  ];
const CustomStudentManager: React.FC = () => {
  const {onOpen,onClose,isOpen,onOpenChange}=useDisclosure()
const [page,setPage]=useState(1)
    const searchValue=useAppSelector((state)=> state.studentData.searchValue);
  const { data } = useGetAllStudentsQuery({ page:page-1, query: searchValue });
  const [initialValues, setInitialValues] = useState<Student | any>({
    id: null,
    name: '',
    email: '',
    phone: '',
    campus: '',
    year: '',
    intake: '',
    academicYear: '',

})


  const studentData: StudentData[] = data?.length > 0
    ? data.map((d: StudentData) => ({
      name: d.name,
      email: d.email,
         campus: d.campus,
      year: d.year,

      intake: d.intake,
      academicYear: d.academicYear,
      actions: (
        <div className='flex items-center justify-around '>
          <CustomToolTip label='Edit'>
            <Button onClick={() => {
              setInitialValues({
                id: d.id,
                name: d.name,
                email: d.email,
                phone: d.phone,
                campus: d.campus,
                year: d.year,
                intake: d.intake,
                  parentName: d.parentName,
                academicYear: d.academicYear,
              })
              onOpen()

            }}>Edit</Button>
          </CustomToolTip>
          <CustomToolTip label='Delete'>
            <Button color="danger">Delete</Button>
          </CustomToolTip>
        </div>
      ),
    }))
    : [
      {
        studentName: 'no data',
      },
    ];

// Rest of your code...

    /* {
      studentName: 'John Doe', parentName: 'Jane Doe', paymentStartDate: '1/1/2023', campus: 'Main Campus', intake: 'Spring 2023',
      actions: (<div className='flex items-center justify-around '>
      <CustomToolTip label='Edit'>
          <Button>Edit</Button>
        </CustomToolTip>
        <CustomToolTip label='Delete'>
          <Button color="danger">Delete</Button>
        </CustomToolTip>
        </div>)
    } */
    // Add more student data as needed


  const [updateStudent] = useUpdateStudentMutation()
  const handleUpdateStudent = async (data: Student) => {
    await updateStudent({data, id:initialValues.id})
    onClose()
  }




  return (
    <div className='w-full relative overflow-y-scroll h-[90%] rounded-md bg-[rgb(236,236,236)] shadow-lg scroll-table'>
      <CustomTable columns={columns} data={studentData} />

        <Modal  isOpen={isOpen} backdrop="blur" onOpenChange={onOpenChange} className="bg-white">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Edit Student</ModalHeader>

                <ModalBody >
                  <CustomStudentForm
                    handleSubmit={handleUpdateStudent}
                    isLoading={false}
                    initialValues={initialValues as Student}
                  />

                </ModalBody>



              </>
            )}
        </ModalContent>
      </Modal>
     {data?.[0]?.totalPage>1 &&  <CustomPagination page={page} setPage={setPage} total={data?.[0]?.totalPage}/>}
    </div>
  );
};

export default CustomStudentManager;
export const CustomToolTip = ({label, children}: {label: string, children: React.ReactNode}) => {
  return (
    <Tooltip content={label} className='text-white' showArrow>
      {children}
    </Tooltip>
  )
}
