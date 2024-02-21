import React from "react";
import {Pagination} from "@nextui-org/react";

export default function CustomPagination({
    total,page,setPage
}:{total:number,page:number,setPage:(page:number)=>void}) {
  return (
    <Pagination loop showControls color="success" onChange={setPage} page={page} total={total} initialPage={1} />
  );
}
