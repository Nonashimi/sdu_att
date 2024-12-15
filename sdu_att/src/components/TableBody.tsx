"use client";

import React from "react";
import Attendance from "./attendance";
import { course, updateAttendanceForCourse } from "@/redux/slice/coursesSection";
import { user } from "@/redux/slice/usersSlice";
import { store } from "@/redux/store/store";
import { getAttendanceData } from "@/hooks/useAttendance";

interface Props {
    filteredCourse: number[];
    course: course | undefined;
    users: user[];
    getFilteredCourse: (element: number[]) => number[];
    thisWeek: number;
    weeks: number;
    filteredAccessToEdit: boolean[]
    editAccess: (index: number) => void;
}

function TableBody({course, users, getFilteredCourse, thisWeek, weeks , filteredAccessToEdit, editAccess}: Props) {
    const attendanceData = getAttendanceData(course, thisWeek, users);


    const updatedAttendance = (clickedWeek: number, attendance_id: number) => {
        if (filteredAccessToEdit[clickedWeek - weeks] && course && clickedWeek < thisWeek) {
            const updatedAttendanceData = course.attendance.map((att) => {
                if (att.id === attendance_id) {
                    return {
                        ...att,
                        att: att.att.map((week, index) =>
                            index === clickedWeek ? (week === 1 ? 0 : 1) : week
                        ),
                    };
                }
                return att;
            });

            store.dispatch(
                updateAttendanceForCourse({ course_id: course.id, attendance: updatedAttendanceData })
            );
        }
    };


    return (
        <tbody className="w-full">
            <tr className="odd:bg-gray-100 even:bg-gray-50 w-full">
                <td className="border border-gray-300 px-4 py-2 text-left"></td>
                {filteredAccessToEdit.map((access, index) => (
                    <td key={`filtered-${index}`} className="border border-gray-300 px-4 py-2">
                        {thisWeek > index + weeks?
                            <input
                            type="checkbox"
                            checked={access}
                            onChange={() => editAccess(index + weeks)}
                        />
                        :
                        <div className=""></div>
                    }
                       
                    </td>
                ))}
                <td className="border border-gray-300 border-collapse box-border flex w-full">
                    <div className="text-green-600 w-[50%] text-center py-2 border border-r-gray-300">
                        &#10003;
                    </div>
                    <div className="text-red-600 w-[50%] text-center py-2 border border-l-gray-300">
                        &#10008;
                    </div>
                </td>
            </tr>
            {attendanceData.map((student) => (
                <tr
                    key={`student-${student.id}`}
                    className="odd:bg-gray-100 even:bg-gray-50"
                >
                    <td className="border border-gray-300 px-4 py-2 text-left">
                        {student.name} {student.surname}
                    </td>
                    <Attendance
                        key={`attendance-${student.id}`}
                        att={course?.attendance[student.id - 1]?.att || []}
                        thisWeek={thisWeek}
                        getFilteredCourse={getFilteredCourse}
                        weeks={weeks}
                        c={student.id}
                        att_id={course?.attendance[student.id - 1]?.id || -1}
                        updateAttendance={updatedAttendance}
                    />
                    <td className="border border-gray-300 box-border flex">
                        <span className="w-[50px] text-center py-2 border border-r-gray-300">
                            {student.countOfExist}
                        </span>
                        <span className="w-[50px] text-center py-2 border border-l-gray-300">
                            {student.countOfAbsence}
                        </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                        {Math.ceil(student.absencePercentage)}%
                    </td>
                </tr>
            ))}
        </tbody>
    );
}

export default TableBody;
