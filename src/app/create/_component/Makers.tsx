'use client'
import React, { useEffect, useState } from 'react';
import { PDFDocument } from 'pdf-lib';

import { useAppSelector } from '#/store/storeHooks';

import SaveAndSend from "#/app/create/_component/SaveAndSend";
import {Checkbox} from "@nextui-org/react";



const Makers: React.FC = () => {
    const [pdfSrc, setPdfSrc] = useState<string | null>(null);
    const data  = useAppSelector((state) => state.studentData)
    const [file, setFile] = useState<Blob | undefined>(undefined);
    const [isChecked, setIsChecked] = useState({
        checkbox1: false,
        checkbox2: false
    });
    useEffect(() => {
        const fetchPDF = async () => {

            const response = await fetch('/receiptRef.pdf');
            const arrayBuffer = await response.arrayBuffer();

            const pdfDoc = await PDFDocument.load(arrayBuffer);
            const form = pdfDoc.getForm();
            const setData = (field: string, value: string | undefined) => isNotEmpty(value) && form.getTextField(field).setText(value);

            setData('name', data.studentData.name);
            setData('email', data.studentData.email);
            setData('phone', data.studentData.phone);
            setData('campus', data.studentData.campus);
            setData('year', data.studentData.year);
       isChecked.checkbox1 ? form.getCheckBox('Check Box2').check() : form.getCheckBox('Check Box2').uncheck();
       isChecked.checkbox2 ? form.getCheckBox('Check Box3').check() : form.getCheckBox('Check Box3').uncheck();

            data.excelData.length > 0 && data.excelData.forEach(({ Field, Value }) => {

                const field = form.getTextField(Field);

                Value!==undefined &&  field.setText(Value.toString());

            });
            const updatedPdfBytes = await pdfDoc.save();
            const blob = new Blob([updatedPdfBytes], { type: 'application/pdf' });
            setFile(blob)

            const reader = new FileReader()
            reader.readAsDataURL(blob)
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    setPdfSrc(reader.result);
                }
            }
            /*    const url = URL.createObjectURL(blob) ;
               setPdfSrc(url); */
        }


        data.excelData && data.studentData && fetchPDF();
    }, [data.excelData, data.studentData, isChecked]);


    return (
        <div className='flex justify-around'>
            {pdfSrc && (
                <iframe

                    height={800}
                    className='  object-cover w-1/3'
                    title="PDF Viewer"
                    width={600}


                    src={pdfSrc}
                />
            )}
            <div className='w-1/2'>
                <div className={'flex flex-col gap-2'}><Checkbox
                    onChange={(e) => setIsChecked({ ...isChecked, checkbox1: e.target.checked })}
                    className={'text-black'} classNames={{label:'text-black'}} color="success">Admission fees</Checkbox>
                    <Checkbox

                        onChange={(e) => setIsChecked({ ...isChecked, checkbox2: e.target.checked })} className={'text-black'} classNames={{label:'text-black'}} color="success">Student License</Checkbox>
                </div>
                <SaveAndSend id={data?.studentData?.id as unknown as number} email={data?.studentData?.email} file={file} sub={'Here is Your Receipt!'} fileType={'invoice'} />
            </div>
        </div>
    );
};
export default Makers;
const fields = [
    'studentName',
    'parentName',
    'campus',
    'year',
    'invoiceNo',
    'intake',
    'totalAmount',
    'Description.0',
    'Amount.0',
    'Description.1',
    'Amount.1',
    'Description.2',
    'Amount.2',
    'Description.3',
    'Amount.3',
    'Description.4',
    'Amount.4',
    'Description.5',
    'Amount.5',
    'Description.6',
    'Amount.6',
    'Description.7',
    'Amount.7',
    'Description.8',
    'Amount.8',
    'Description.9',
    'Amount.9',
    'Description.10',
    'Amount.10',
]
function isNotEmpty(value: string | undefined): boolean {
    return value !== "" && value !== undefined;
}



