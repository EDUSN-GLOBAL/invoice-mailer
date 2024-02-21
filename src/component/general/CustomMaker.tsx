// ReusableInvoiceMaker.tsx
import React from 'react';
import Image from 'next/image';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

interface ReusableMakerProps {
  title: string;
  iconSrc: string;

  route:string
}
const ReusableMaker: React.FC<ReusableMakerProps> = ({ title, iconSrc,route }) => {
  return (
    <Button variant='bordered' color='primary' disableRipple className='h-3/4 shadow-2xl w-1/3 border-2 border-dashed '>
      <Link href={route}  className='h-full flex cursor-pointer flex-col items-center justify-around p-4'>
        <h1 className='text-5xl font-bold text-center text-black'>{title}</h1>
        <div className='relative w-[200px] h-[200px]'>
          <Image src={iconSrc} alt={`${title} icon`} fill />
        </div>
      </Link>
    </Button>
  );
};

export default ReusableMaker;
