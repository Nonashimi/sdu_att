import { course, updateAttendanceForCourse } from "@/redux/slice/coursesSection";
import { user } from "@/redux/slice/usersSlice";
import { store } from "@/redux/store/store";
import { useMemo } from "react";

export function getAttendanceStats(att: number[], thisWeek: number) {
    const countOfExist = att.slice(0, thisWeek).reduce((sum, val) => sum + val, 0);
    const countOfAbsence = thisWeek - countOfExist;
    return { countOfExist, countOfAbsence, absencePercentage: (countOfAbsence / 10) * 100 };
}


export const getAttendanceData = (course:course | undefined, thisWeek:number, users: user[]) =>{
    return useMemo(() => {
        if (!course) return [];
        return course.students_id.map((studentId, index) => {
            const att = course.attendance[studentId - 1]?.att || [];
            const stats = getAttendanceStats(att, thisWeek);
            return {
                id: studentId,
                name: users[studentId - 1]?.name || "Unknown",
                surname: users[studentId - 1]?.surname || "",
                ...stats,
            };
        });
    }, [course, users, thisWeek]);
}


export const getUpdatedAttendance = (clickedWeek: number, attendance_id: number, course:course, thisWeek:number) => {
    if (!course || thisWeek <= clickedWeek) return; 
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
      updateAttendanceForCourse({course_id:course.id, attendance:updatedAttendanceData})
    );
  };
  