'use client'

import { Button } from "@nextui-org/react";


import { useAddInstallmentByStudentIdMutation } from "#/store/query/StudentApi";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
const CustomFileManager=dynamic(()=>import('./_component/SingleStudentFile'),{})
export default function Page({ params }: { params: { name: number } }) {
    const [addStudent] = useAddInstallmentByStudentIdMutation()

    const searchParams=useSearchParams()
    const handleAddInstallment = async () => {
    await addStudent({id:params.name})
}
    return <div className=" h-screen">
        <div className="p-4 h-20 flex justify-between">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <h1 className="text-bold text-2xl">{ searchParams.get('name') }'s installments</h1>
            <Button onClick={handleAddInstallment}>create</Button>
        </div>

        <CustomFileManager id={params.name} />
  </div>
}
