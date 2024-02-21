import React from 'react';
import StudentHeader from "#/app/students/_component/Header";
import CustomStudentManager from "#/app/students/_component/CustomStudentManager";

const StudentsLayout = ({children}:{children:React.ReactNode}) => {
    return (
        <div className='w-full h-[100vh]  overflow-hidden p-4'>
            <StudentHeader/>
            {children}
        </div>
    );
};

export default StudentsLayout;
