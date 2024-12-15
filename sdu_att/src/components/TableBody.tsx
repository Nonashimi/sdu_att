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
    filteredAccessToEdit: boolean[];
    editAccess: (index: number) => void;
}

function TableBody({
    course,
    users,
    getFilteredCourse,
    thisWeek,
    weeks,
    filteredAccessToEdit,
    editAccess,
}: Props) {
    const attendanceData = getAttendanceData(course, thisWeek, users);

    const updatedAttendance = (clickedWeek: number, attendance_id: number) => {
        if (!filteredAccessToEdit[clickedWeek - weeks] || !course || clickedWeek >= thisWeek) return;

        const updatedAttendanceData = course.attendance.map((att) =>
            att.id === attendance_id
                ? {
                      ...att,
                      att: att.att.map((week, index) =>
                          index === clickedWeek ? (week === 1 ? 0 : 1) : week
                      ),
                  }
                : att
        );

        store.dispatch(
            updateAttendanceForCourse({ course_id: course.id, attendance: updatedAttendanceData })
        );
    };

    const renderAccessCheckboxes = () =>
        filteredAccessToEdit.map((access, index) => (
            <td key={`filtered-${index}`} className="border border-gray-300 px-4 py-2 text-center">
                {thisWeek > index + weeks && (
                    <input
                        type="checkbox"
                        checked={access}
                        onChange={() => editAccess(index + weeks)}
                    />
                )}
            </td>
        ));

    return (
        <tbody className="w-full">
            <tr className="odd:bg-gray-100 even:bg-gray-50 w-full">
                <td className="border border-gray-300 px-4 py-2"></td>
                {renderAccessCheckboxes()}
                <td className="border border-gray-300 flex">
                    <div className="text-green-600 w-[50%] text-center py-2 border-r border-gray-300">
                        &#10003;
                    </div>
                    <div className="text-red-600 w-[50%] text-center py-2 border-l border-gray-300">
                        &#10008;
                    </div>
                </td>
            </tr>
            {attendanceData.map((student) => {
                const studentAttendance = course?.attendance[student.id - 1] || { att: [], id: -1 };
                return (
                    <tr
                        key={`student-${student.id}`}
                        className="odd:bg-gray-100 even:bg-gray-50"
                    >
                        <td className="border border-gray-300 px-4 py-2">
                            {student.name} {student.surname}
                        </td>
                        <Attendance
                            att={studentAttendance.att}
                            thisWeek={thisWeek}
                            getFilteredCourse={getFilteredCourse}
                            weeks={weeks}
                            c={student.id}
                            att_id={studentAttendance.id}
                            updateAttendance={updatedAttendance}
                        />
                        <td className="border border-gray-300 flex">
                            <span className="w-[50%] text-center py-2 px-2 border-r border-gray-300">
                                {student.countOfExist}
                            </span>
                            <span className="w-[50%] text-center py-2 px-2 border-l border-gray-300">
                                {student.countOfAbsence}
                            </span>
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                            {Math.ceil(student.absencePercentage)}%
                        </td>
                    </tr>
                );
            })}
        </tbody>
    );
}

export default TableBody;
