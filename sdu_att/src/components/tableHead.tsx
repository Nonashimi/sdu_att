import React from 'react'

type Props = {
    filteredCourse: number[]
}

function TableHead({filteredCourse}: Props) {
  return (
    <thead className='w-full'>
        <tr className="bg-blue-700 text-white w-full">
            <th className="border border-gray-300 px-4 py-2 w-[30%]">Student Name</th>
            {filteredCourse.map((c, index) => (
            <th key={`${c}-${index}`} className="border border-gray-300 px-4 py-2">{c} week</th>
            ))}
            <th className="border border-gray-300 py-2">Total</th>
            <th className="border border-gray-300 px-4 py-2">Absence Rate</th>
        </tr>
    </thead>
  )
}

export default TableHead