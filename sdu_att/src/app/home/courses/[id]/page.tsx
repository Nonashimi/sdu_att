"use client"


import TableBody from '@/components/TableBody'
import TableHead from '@/components/tableHead'
import { FetchIdByParams, getCourse, getNameLectors, usefetchUsers, useLectorsAndCourses } from '@/hooks/useAuthentififcation'
import { usePagination } from '@/hooks/usePagination'
import React, { useEffect, useState } from 'react'

type Props = {
    params: Promise<{id: number}>
}

function page({params}: Props) {
    const {courses, lectors} = useLectorsAndCourses();
    const users = usefetchUsers();
    const thisWeek = 7;
    const id = FetchIdByParams(params);
    const course = getCourse(id, courses);
    const {thisPage, getFilteredCourse, clickLeft, clickRight, pageTotal} = usePagination(course);
    const [accessToEdit, setAccessToEdit] = useState<boolean[]>(Array(10).fill(false));
    const filteredCourse = getFilteredCourse(course?course?.students_id:[]);
    const full_name = getNameLectors(course?course.lecture_id:1, lectors);

    const editAccess = (index: number) => {
      setAccessToEdit((prev) =>
          prev.map((access, i) => (i === index ? !access : access))
      );
  };
  return (
    <div className='mt-[40px] mx-[10px]'>
        <div className="flex gap-[5px]">
            <div className="">{full_name}</div> | 
            <div className="">{course?.course_name}</div>
        </div>
        <div className="flex gap-[10px]">
            <div className="" onClick={clickLeft}>left</div>
            <div className="" >{thisPage}</div>
            <div className="" onClick={clickRight}>right</div>
        </div>
      <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg bg-white">
        <TableHead filteredCourse = {filteredCourse}/>
        <TableBody filteredAccessToEdit = {getFilteredCourse(accessToEdit)} editAccess={editAccess} filteredCourse={filteredCourse} weeks={(thisPage  - 1)* pageTotal} users = {users} thisWeek = {thisWeek} course = {course} getFilteredCourse = {getFilteredCourse}/>
      </table>
    </div>
  )
}

export default page
