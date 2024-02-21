import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import React from 'react'

const BreadCrumbsComponent = () => {
const pathname = usePathname(); // Assuming usePathname() returns the current pathname
    const pathArray = pathname?.split('/').filter(Boolean).map((path, index, array) => {
  const fullPath = array.slice(0, index + 1).join('/');
  return { path, fullPath };
});

    const router = useRouter()

  return (
   <Breadcrumbs size="md"color="secondary">
          <BreadcrumbItem className="text-black" onClick={() => router.push("/") }>Home</BreadcrumbItem>
          {pathArray.map((paths, index) => (
            <BreadcrumbItem key={index} className="text-black" onClick={() => router.push(`/${paths.fullPath}`)}>
              {paths.path}
            </BreadcrumbItem>
          ))}
        </Breadcrumbs>
  )
}

export default BreadCrumbsComponent
