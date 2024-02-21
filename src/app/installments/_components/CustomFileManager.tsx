// CustomFileManager.tsx
'use client'
import React, { ReactElement, useState } from 'react';

import CustomTable from '#/component/general/CustomTable';
import { useGetAllStudentsQuery } from '#/store/query/StudentApi';

import Link from 'next/link';
import { Button } from '@nextui-org/react';
import CustomPagination from '#/component/general/CustomPagination';
import {useAppSelector} from "#/store/storeHooks";




interface FileData {
  id?: number;
  folder: boolean;
  name: string;
  campus?: string;
  year?: string;
  email: string;
  date: Date;

  action: ReactElement;

}

const CustomFileManager: React.FC = () => {
const [page,setPage]=useState(1)
const searchValue=useAppSelector((state)=> state.studentData.searchValue);

const {data}=useGetAllStudentsQuery({page:page-1,query:searchValue})
  const columns = [
    { key: 'folder', label: 'Folder', sortable: false },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'campus', label: 'Campus', sortable: true },
    {key:'year',label:'campus',sortable:true},
    {key: 'email',label:'Email',sortable:true},
    { key: 'date', label: 'Date', sortable: true },
    {key:'action',label:'Action',sortable:false}
  ];

  const fileData: FileData[] =

    data?.length > 0
      ? data.map((d: FileData) => ({
        folder: true,
        name: d.name,
        email: d.email,
        campus: d.campus,
        year: d.year,
        date: (d && d.date) ? new Date(d.date).toLocaleString("en-US", { timeZone: "Asia/Yangon" }) : '',
        action: <Link href={`/installments/${d.id}?name=${d.name} `} >
          <Button>
          view</Button>
        </Link>


      })):   [
      {
        name: 'no data',
          folder: false,
      },
    ];

  return (
    <div className='w-full relative overflow-y-scroll h-[90%] overflow-x-hidden rounded-md bg-[rgb(236,236,236)] shadow-lg scroll-table'>
      <CustomTable columns={columns} data={fileData} />
      {data?.[0]?.totalPage>1 &&  <CustomPagination page={page} setPage={setPage} total={data?.[0]?.totalPage}/>}
    </div>
  );
};

export default CustomFileManager;
