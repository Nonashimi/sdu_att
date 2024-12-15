import React from 'react'

type Props = {
    getFilteredCourse: (element: number[]) => number[],
    att: number[],
    c: number,
    thisWeek: number,
    weeks: number,
    att_id: number,
    updateAttendance: (clickedWeek:number, attendance_id: number) => void;
}


function Attendance({getFilteredCourse, att, c, thisWeek, weeks, att_id, updateAttendance}: Props) {
  return getFilteredCourse(att).map((att, attIndex) => (
        <td onClick={() => updateAttendance(attIndex  + (weeks), att_id)} key={`att-${c}-${attIndex}`} className="border border-gray-300 cursor-pointer px-4 py-2 text-green-600">
            {thisWeek > attIndex  + (weeks)? <div className={`${att!=0?"text-green-600":"text-red-600"} font-extrabold`}>{att != 0? '✓' : '✗'}</div>:""}
        </td>
    ))
  
}

export default Attendance