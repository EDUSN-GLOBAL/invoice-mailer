'use client'
import React, { useEffect, useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Document, Page } from 'react-pdf';
import { useAppSelector } from '#/store/storeHooks';
import Image from 'next/image';
import SaveAndSend from "#/app/create/_component/SaveAndSend";
import {StudentData} from "#/store/slice/StudentDataSlice";


const PDFInvoice: React.FC = () => {
  const [pdfSrc, setPdfSrc] = useState<string | null>(null);
    const data  = useAppSelector((state) => state.studentData)
    const [file, setFile] = useState<Blob | undefined>(undefined);

  useEffect(() => {
    const fetchPDF = async () => {

            const response = await fetch('/invoiceRef.pdf');
            const arrayBuffer = await response.arrayBuffer();

            const pdfDoc = await PDFDocument.load(arrayBuffer);
      const form = pdfDoc.getForm();
const setData = (field: string, value: string | undefined) => isNotEmpty(value) && form.getTextField(field).setText(value);

setData('name', data.studentData.name);
      setData('email', data.studentData.email);
      setData('phone', data.studentData.phone);
      setData('campus', data.studentData.campus);
      setData('year', data.studentData.year);

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
  }, [data.excelData, data.studentData]);


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
<SaveAndSend id={data?.studentData?.id as unknown as number} email={data?.studentData?.email} file={file} sub={'Send Invoice '} fileType={'invoice'} />
      </div>
    </div>
  );
};
export default PDFInvoice;
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



