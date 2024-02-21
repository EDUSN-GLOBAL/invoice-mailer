'use client'
import { useState } from 'react';
import { useGetStudentByNameQuery } from '#/store/query/generalApi';
import { Button, Input } from '@nextui-org/react';
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '#/store/storeHooks';
import { StudentData, resetStudentData, setSearchValue, setStudentData } from '#/store/slice/StudentDataSlice';
import { MdClear } from 'react-icons/md';



const StudentAutoComplete = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const students = useAppSelector((state) => state.studentData)
    const studentData=students.studentData
  const { data } = useGetStudentByNameQuery(students.searchValue);
const dispatch=useAppDispatch()
  const handleSearch = () => {
    dispatch(setSearchValue(searchTerm))
  };

    
    
  return (
      <div className='h-full w-1/3 justify-self-center relative'>
          <Input 
              variant='bordered' 
              size='lg' 
              value={students.studentData.name !== "" ? studentData.name +" ,"+studentData.year+","+studentData.campus  : searchTerm}
              placeholder='Search a student' 
              className=' text-black ' 
              onChange={(e) => setSearchTerm(e.target.value)}
              endContent={
                  
                  <> <MdClear className='text-xl cursor-pointer'
                  onClick={() => {
                      setSearchTerm("")
                      dispatch(resetStudentData())
                    
                  }}
                  />
                 <Button className='h-[2.5rem]' isDisabled={students.studentData.name !== ""} isIconOnly onPress={handleSearch} endContent={<FaSearch />} >
                      </Button>
                      </>
              }
          />
          {data && students?.searchValue !== "" && studentData?.name === "" &&
              <div className='w-full  bg-slate-200 absolute rounded-xl p-4'>
              {data?.length === 0 && <p className='text-black text-xl border-b-2 border-black hover:bg-slate-400 cursor-pointer'>No data found</p>}
              {data?.map((item: StudentData, index: number) => (
                  <p key={index} className='text-black text-xl border-b-2 border-black hover:bg-slate-400 cursor-pointer'
                      onClick={() => dispatch(setStudentData(item))}
                  >
                      {item.name},{item.year},{item.campus}
                  </p>
              ))}
             
          </div>}
      </div>
  )
}

export default StudentAutoComplete;


