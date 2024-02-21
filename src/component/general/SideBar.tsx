'use client'
import React from 'react'
import Logo from '#/assets/Logo.png'
import Image from 'next/image'

import {  Button, Link, Tooltip } from '@nextui-org/react';
import { sideBarsMenus } from './sidebarIcon';

import { usePathname, useRouter } from 'next/navigation';
import BreadCrumbsComponent from './BreadCrumbsComponent';

const SideBar = ({children}: {children: React.ReactNode}) => {
    const router = useRouter()
    const pathname = usePathname()
  return (
    <>
      <div className="flex bg-gray-100 text-gray-900 h-screen overflow-hidden   ">
     
      
          <aside className="flex h-screen w-20 flex-col items-center border-r border-gray-200 bg-white sticky top-0 left-0">
   
              <div className="flex h-[4rem] w-full flex-col items-center justify-center border-b p-4 border-gray-200 ">
                  <Image src={Logo} alt="Logo" className="h-15 w-15" />
                
              </div>
              {sideBarsMenus.map((menu, index) => (
                  <nav  key={index} className="flex flex-1 flex-col gap-y-4 pt-10 justify-center">
                      <Tooltip className='text-white' content={menu.desc} showArrow placement='right'>
                    {menu.name === 'Logout' ?
                      <Button
                        onClick={() => {
                          if (menu.action) {
                            menu.action();
                            router.refresh();
                          }
                        }}
                        endContent={menu.icon}
                        isIconOnly
                      ></Button>
                      :
                      <Link href={menu?.link as string} className={`${pathname.includes(menu?.link as string) && 'p-2 bg-slate-600 text-gray-50 rounded-full scale-125'  } transition-all  `}   >
                          {menu.icon}
                      </Link>
                         } 
                      </Tooltip>
                </nav>
              ))}
      
        
        </aside>  <div className='w-full'>
          <BreadCrumbsComponent />
          {children}
      </div>
    </div>
      </>
  )
}

export default SideBar