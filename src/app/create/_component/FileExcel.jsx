'use client'
import { setExcelData } from "#/store/slice/StudentDataSlice";
import { useAppDispatch } from "#/store/storeHooks";
import { Button } from "@nextui-org/react";
//@ts-ignore
import { useState } from "react";
import * as XLSX from "xlsx";



function FileExcel() {

  const [data, setData] = useState([]);

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
    };
  }
  const stringJson = data.map((item) => {
    return {
      Field: item.Field,
        Value: item.Value === undefined  ? ''  : item.Value.toString()
    }
  }
 );


// Convert to JSON string
const dispatch=useAppDispatch()
const submitData=()=>{
  dispatch(setExcelData(stringJson))
}
// Print the combined JSON string
console.log(stringJson);
  return (
    <div className="App flex items-center max-w-1/2">

      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
      />

      <Button onClick={submitData}>Submit</Button>

    </div>
  );
}

export default FileExcel;
const excelDgata=[
{Field: 'invoiceNo', Value: "12012"},

{Field: 'parentName', Value: 'U kyaw'}
,
{Field: 'Decription.0', Value: 'for campus '}
,
{Field: 'Amount.0', Value: "120129"}
,
{Field: 'totalAmount', Value: "100"}]
