'use client';

import { useDisclosure } from "@nextui-org/react";

import ReusableHeader from "#/component/general/CustomPageHeader";
import CustomChildModalFile from "./CustomChildModalFile";
const FileManagerHeader = () => {

      const { isOpen, onOpen, onOpenChange } = useDisclosure();



    return (<ReusableHeader path="file" title="File Manager"   onOpen={onOpen}  isOpen={isOpen} onOpenChange={onOpenChange} >

  {<CustomChildModalFile/>}
  </ReusableHeader>);
};
export default FileManagerHeader;
