import { useEffect, useState } from "react";

export const getCounterOfExist = (att: number[], thisWeek: number) => {
    const [attendance, setAttendance] = useState({countOfExist:0, countOfAbsence:0});
    useEffect(() =>{
        setAttendance({countOfExist: att.slice(0, thisWeek).reduce((sum, val) => sum + val, 0), countOfAbsence: thisWeek - att.slice(0, thisWeek).reduce((sum, val) => sum + val, 0)});
    },[att]);
    return attendance;
  };
  