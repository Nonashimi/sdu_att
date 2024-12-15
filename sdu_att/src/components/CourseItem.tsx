import { getNameLectors } from '@/hooks/useAuthentififcation'
import { course } from '@/redux/slice/coursesSection'
import { lector } from '@/redux/slice/lectoreSlice'
import Link from 'next/link'
import React from 'react'

type Props = {
    course: course,
    index: number,
    lectors: lector[]
}

function CourseItem({course, index, lectors}: Props) {
 
    const full_name:string = getNameLectors(course.id, lectors);

  return (
    <Link href={"courses/" + course.id}>
       <div className="grid grid-cols-[1fr_4fr_4fr_4fr] gap-[10px] border p-[20px] border-[#ccc] rounded-[10px] transition-all cursor-pointer hover:translate-x-2 hover:bg-slate-50" >
            <div className="">{index + 1}.</div> 
            <div className="">{course.course_name}</div>
            <div className="">{course.students_id.length}</div>
            <div className="">{full_name}</div>
        </div>
    </Link>
     
  )
}

export default CourseItem