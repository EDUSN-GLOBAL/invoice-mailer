// ReusableHeader.tsx

import React from 'react';

import {  Modal, ModalContent, ModalHeader, ModalBody, Button, Input } from '@nextui-org/react';
import { FaSearch, FaPlusCircle } from 'react-icons/fa';
import {useAppDispatch} from "#/store/storeHooks";
import {setSearchValue} from "#/store/slice/StudentDataSlice";
import {MdClose} from "react-icons/md";

interface ReusableHeaderProps {
  path?: string;
  title: string;
  onSearch?: () => void;

    onOpen: () => void;
    isOpen?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
    children?: React.ReactNode;
}

const ReusableHeader: React.FC<ReusableHeaderProps> = ({path, title, onSearch,onOpen,isOpen, onOpenChange,children }) => {


    const [value, setValue] = React.useState<string>('');
    const dispatch=useAppDispatch()
    const clearValue = () => {
      setValue('')
      dispatch(setSearchValue(''))
    }
  return (
    <div className='w-full h-[5vh] mb-6 flex items-end justify-between px-4 '>
      <h1 className='text-3xl'>{title}</h1>

        <Input
          label="Search"
          className='w-1/3'
          isClearable
          radius="lg"
          value={value}
          classNames={{

          }}
          onChange={(e) => setValue(e.target.value)}
                  placeholder="Type to search..."

          endContent={
            <div className={'flex items-center w-[5rem] '}>
                <MdClose size={30} onClick={clearValue} className='text-white'/>
              <Button className='h-[2.5rem]' isIconOnly onPress={() => dispatch(setSearchValue(value))} endContent={<FaSearch />} />
            </div>
          }
        />


        <Button  className={`h-[2.5rem] ${path==='file' && 'hidden'}` }onClick={() => onOpen()} endContent={<FaPlusCircle />}>
          Add
        </Button>


        <Modal  isOpen={isOpen} backdrop="blur" onOpenChange={onOpenChange} className="bg-white">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>{title}</ModalHeader>
              {/* isFooterExist ? <CustomModal onClose={onClose} action={onAdd} actionText='save'>
                <ModalBody>
                  {children}
                </ModalBody>
              </CustomModal> : */ <ModalBody>{children}</ModalBody>}

              </>
            )}
          </ModalContent>
        </Modal>

    </div>
  );
};

export default ReusableHeader;
