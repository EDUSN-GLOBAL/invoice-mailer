import { createSlice } from "@reduxjs/toolkit"

export type StudentData = {
    id: string | undefined
    name: string
    email: string
    phone: string
    campus: string
    year: string
}
export type StudentDataExcel = {
    Field: ''
    Value:''
}
type StudentDataState = {
    studentData: StudentData

    searchValue: string
    excelData:StudentDataExcel[]
}
const initialSlice: StudentDataState = {
   studentData: {
       id:'' ,
       name: '',
       email: '',
       phone: '',
       campus: '',
       year: ''
   },
    searchValue: '',
    excelData:[]

}

export const studentDataSlice = createSlice({
    name: 'studentData',
    initialState: initialSlice,
    reducers: {

        setSearchValue: (state, action) => {
            state.searchValue = action.payload
        }
        ,setStudentData: (state, action) => {
            state.studentData = action.payload
        },
        setExcelData: (state, action) => {
            state.excelData = action.payload
        },
        resetStudentData: (state) => {
            state.searchValue = ''
            state.studentData = initialSlice.studentData
        }
    },

})
export const { setSearchValue,setStudentData,resetStudentData,setExcelData } = studentDataSlice.actions
export default studentDataSlice.reducer
