"use client"


import TableBody from '@/components/TableBody'
import TableHead from '@/components/tableHead'
import { useFetchIdByParams, getCourse, getNameLectors, useFetchUsers, useLectorsAndCourses } from '@/hooks/useAuthentififcation'
import { usePagination } from '@/hooks/usePagination'
import React, { useRef, useState } from 'react'

type Props = {
    params: Promise<{id: number}>
}

function Page({params}: Props) {
  const photoInputRef = useRef<HTMLInputElement | null>(null);  
  const [PeopleWhoHere, setPeopleWhoHere] = useState([]);

  const clickSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const photoInput = photoInputRef.current;

    if (!photoInput || !photoInput.files || photoInput.files.length === 0) {
      alert('Please select a photo to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('photo', photoInput.files[0]);

    try {
      const response = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setPeopleWhoHere(PeopleWhoHere);
        console.log('Server response:', data);
      } else {
        const errorData = await response.json();
        console.error('Error from server:', errorData);
        alert(`Error: ${errorData.error || 'Unable to process the photo.'}`);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      alert('An error occurred while communicating with the server. Please try again.');
    }
  };
 
    const clickBtn = () =>{
      console.log(PeopleWhoHere);
      
    }

    const {courses, lectors} = useLectorsAndCourses();
    const users = useFetchUsers();
    const thisWeek = 7;
    const id = useFetchIdByParams(params);
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
      <div className="flex justify-between">
        <div className="flex gap-[5px]">
              <div className="">{full_name}</div> | 
              <div className="">{course?.course_name}</div>
          </div>
      </div>
        <div className="flex gap-[10px]">
            <div className="" onClick={clickLeft}>left</div>
            <div className="" >{thisPage}</div>
            <div className="" onClick={clickRight}>right</div>
        </div>
      <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg bg-white">
        <TableHead filteredCourse = {filteredCourse}/>
        <TableBody peopleWhoHere={PeopleWhoHere}  filteredAccessToEdit = {getFilteredCourse(accessToEdit)} editAccess={editAccess} filteredCourse={filteredCourse} weeks={(thisPage  - 1)* pageTotal} users = {users} thisWeek = {thisWeek} course = {course} getFilteredCourse = {getFilteredCourse}/>
      </table>
      <section id="upload-section">
            <h2>Upload Photo</h2>
            <form id="upload-form">
                <input type="file" id="photo" name="photo" accept="imageonClick={() =>clickBtn}/*" required/>
                <button  type="submit">Upload</button>
            </form>
            <button onClick={() =>clickBtn()}>btn</button>
        </section>
    </div>
  )
}

export default Page
