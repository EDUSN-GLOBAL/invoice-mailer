// CustomTable.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { FaSortDown } from 'react-icons/fa6';
import { Button } from '@nextui-org/react';
import { FaFolder } from 'react-icons/fa';


interface TableColumn {
  key: string;
  label: string;
  sortable: boolean;
}

interface TableProps {
  columns: TableColumn[];
  data: any[];
}

const CustomTable: React.FC<TableProps> = ({ columns, data }) => {
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (criteria: string) => {
    if (sortBy === criteria) {
      setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(criteria);
      setSortOrder('asc');
    }
  };

  const renderHeader = (column: TableColumn) => (
    <th key={column.key} className='p-2 text-center ' onClick={() => column.sortable && handleSort(column.key)}>
      {column.label}
      {column.sortable && <FaSortDown className={`${sortBy === column.key && sortOrder === 'asc' ? 'rotate-180 ' :'pl-2' }  text-xl inline`} />}
    </th>
  );

  const sortedData = [...data].sort((a, b) => {
    if (!sortBy) return 0;
    const comparison = a[sortBy].localeCompare(b[sortBy]);
    return sortOrder === 'asc' ? comparison : -comparison;
  });
    console.log(sortedData.length)

  return (
    <table className='w-full border-collapse mx-auto relative '>
      <thead className='sticky z-10 top-0 bg-gray-200'>
        <tr>{columns.map((column) => renderHeader(column))}</tr>
      </thead>
      <tbody className='z-0 py-2  '>
        {sortedData.length > 0 ?sortedData.map((item, index) => (
          <tr key={index} className='border-b hover:bg-gray-100 '>
            {columns.map((column) => (
              <td key={column.key} className={`p-2 text-center ${column.key === 'folder' ? 'flex items-center justify-center' : ''}`}>
                {column.key === 'folder' ? (
         <FaFolder className='text-2xl  ' />
                ) : (
                  item[column.key]
                )}
              </td>
            ))}
          </tr>
        )): <tr><td colSpan={columns.length} className='text-center p-2'>No data At this moment</td></tr>}
      </tbody>
    </table>
  );
};

export default CustomTable;
