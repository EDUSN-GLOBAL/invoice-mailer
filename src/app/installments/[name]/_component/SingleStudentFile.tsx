// CustomFileManager.tsx
'use client'
import React, { ReactElement, useState } from 'react';

import CustomTable from '#/component/general/CustomTable';
import { useGetAllInstallmentsByStudentIdQuery, useGetAllStudentsQuery } from '#/store/query/StudentApi';
import { Button, CircularProgress } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import { MdCircle } from 'react-icons/md';
import Link from 'next/link';



export type Installment = {
    id: number;
    name: string;
    created_by: string;
  date: Date;
    action?: ReactElement
}
type props = {
  id: number,

}
const CustomFileManager: React.FC<props> = ({id}) => {



const {data,isLoading}=useGetAllInstallmentsByStudentIdQuery({id})
  const columns = [
    { key: 'folder', label: 'Folder', sortable: false },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
    {key:'created_by',label:'CreatedBy',sortable:true},
    {key:'action',label:'Action',sortable:false}

  ];


  const fileData =

    data !==undefined && data?.length > 0
      ? data.map((d: Installment) => ({

        name: d.name,

        date: (d && d.date) ? new Date(d.date).toLocaleString("en-US", { timeZone: "Asia/Yangon" }) : '',
        created_by:d.created_by,
        action:<Link href={`/installments/${id}/${d.id}`}><Button >
          view
        </Button></Link>


      })):   [
        {
          name: !isLoading && 'no data',
          action:   isLoading&&  <CircularProgress label="Loading..." />


      },
    ];

  /* [


    { folder: true, email:'test@gmail.com', name: 'Folder 1', date: '1/1/2023 11:00 AM', size: '100 MB'  },
    { folder: true,email:'test@gmail.com', name: 'Folder 2', date: '1/1/2022 12:00 AM', size: '150 MB' },
  ] */;


  return (
    <div className='w-full relative overflow-y-scroll h-[90%] rounded-md bg-[rgb(236,236,236)] shadow-lg scroll-table'>
      <CustomTable columns={columns} data={fileData} />
    </div>
  );
};

export default CustomFileManager;
