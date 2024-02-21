import React from 'react';
import InfinityScrollTable from "#/app/create/mail-history/_components/InfinityScrollTable";

const MailHistory = () => {
    return (
        <div className={'p-2 flex flex-col justify-center h-[90vh]'}>
            <h1 className={'text-3xl font-bold'}>Mail History</h1>
            <InfinityScrollTable/>
        </div>
    );
};

export default MailHistory;
