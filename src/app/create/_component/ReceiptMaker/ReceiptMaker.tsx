// Example usage

import ReusableMaker from '#/component/general/CustomMaker';
import InvoiceIcon from '#/assets/invoiceIcon.svg';
import MailIcon from '#/assets/mailIcon.svg';

const ReceiptMaker = () => {


    return (

    <ReusableMaker title="Receipt Maker" iconSrc={InvoiceIcon}  route="create/receipt-maker"/>

  );
};
export default ReceiptMaker
export const MailMaker = () => {


    return (

        <ReusableMaker title="Mail History" iconSrc={MailIcon}  route="create/mail-history"/>

    );
};

export const InvoiceMaker = () => {

    return (

        <ReusableMaker title="Invoice Maker" iconSrc={InvoiceIcon}  route="create/invoice-maker"/>

    );
};
