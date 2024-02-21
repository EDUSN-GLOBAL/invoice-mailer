// CustomFileManager.tsx
'use client'
import React, { ReactElement, useState } from 'react';

import CustomTable from '#/component/general/CustomTable';
import { Button, CircularProgress } from '@nextui-org/react';

import { useGetAllFilesFromInstallmentQuery } from '#/store/query/StudentApi';
import { MdDownload } from 'react-icons/md';



export type FileFromInstallment  = {
    id: number;
  name: string;
  type: string;
  url: string;
    installmentid: number;
    created_by: string;
  date: Date;
    action?: ReactElement
}
type props = {
  id: number,
 
}
const CustomFileManager: React.FC<props> = ({id}) => {
 

 

const {data,isLoading}=useGetAllFilesFromInstallmentQuery({id})
  const columns = [

    { key: 'name', label: 'Name', sortable: true },
  
     {key:'type',label:'Type',sortable:true},
    { key: 'created_by', label: 'CreatedBy', sortable: true },
      { key: 'date', label: 'Date', sortable: true },
   
    {key:'action',label:'Action',sortable:false}


  
  ];


console.log(data);

  const fileData =
  
    data !==undefined && data?.length > 0
      ? data.map((d: FileFromInstallment) => ({
        name: d.name,
        type:d.type,
        date: (d && d.date) ? new Date(d.date).toLocaleString("en-US", { timeZone: "Asia/Yangon" }) : "-",
        created_by: d.created_by,
        action: <Button color="default" endContent={<MdDownload size={20} />} onClick={() => window.open(d.url)}>Download</Button>,
      
   
      
        
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
