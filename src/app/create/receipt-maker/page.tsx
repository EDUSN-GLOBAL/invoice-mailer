import React from 'react';
import StudentAutoComplete from "#/app/create/_component/StudentAutoComplete";
import FileExcel from "#/app/create/_component/FileExcel";

import Makers from "#/app/create/_component/Makers";

const Receipt = () => {
    return (

            <div className='w-full h-screen  '>
                <div className='flex justify-around p-8'>
                    <StudentAutoComplete/>
                    <div className='w-1/4'>
                        <FileExcel/>
                    </div></div>
                <Makers/>
            </div>

    );
};

export default Receipt;
