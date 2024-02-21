'use client'
import React, {useState} from 'react';
import {useGetMailQuery} from "#/store/query/mailApi";

const InfinityScrollTable = () => {
const [page,setPage]=useState(1)
const {data}=useGetMailQuery({page,size:10})
    console.log(data)
    return (
        <div className={'h-[85vh] border-2 relative overflow-y-scroll'}>
            <header className={'border-b-2 sticky bg-white top-0 z-10 w-full h-[10%] grid grid-cols-5 place-items-center '}>
                {headerItems.map((item,index)=><h1 key={index} className={'text-center'}>{item}</h1>)}
            </header>
            <div className={' w-full min-h-full z-0  '}>
              <div className={'grid-cols-5 grid place-items-center my-4'}>  {headerItems.map((item,index)=><h1 key={index} className={'text-center'}>{item}</h1>)}</div>
                <div className={'grid-cols-5 grid place-items-center'}>  {headerItems.map((item,index)=><h1 key={index} className={'text-center'}>{item}</h1>)}</div>
                <div className={'grid-cols-5 grid place-items-center my-4'}>  {headerItems.map((item,index)=><h1 key={index} className={'text-center'}>{item}</h1>)}</div>
                <div className={'grid-cols-5 grid place-items-center my-4'}>  {headerItems.map((item,index)=><h1 key={index} className={'text-center'}>{item}</h1>)}</div>

            </div>

        </div>
    );
};

export default InfinityScrollTable;
const headerItems=['student','email','subject','body','sentDate']
