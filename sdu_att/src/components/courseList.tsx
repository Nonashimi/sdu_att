"use client"
import React from 'react'

import CourseItem from './CourseItem';
import { useLectorsAndCourses } from '@/hooks/useAuthentififcation';


function CourseList() {
   const {courses, lectors} = useLectorsAndCourses();
  return (
    <div className='px-[10px]'>
        <div className="grid grid-cols-[1fr_4fr_4fr_4fr] gap-[10px] mb-[20px] p-[20px] ">
        <div className="font-bold">№</div> 
            <div className="font-bold">Name of Courses:</div>
            <div className="font-bold">Number of students:</div>
            <div className="font-bold">Teacher:</div>
        </div>
        {courses.map((course, index) =>
          <CourseItem key = {course.id} course={course} index = {index} lectors = {lectors}/>
        )}
    </div>
  )
}

export default CourseList