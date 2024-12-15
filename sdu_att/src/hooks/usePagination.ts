import { course } from "@/redux/slice/coursesSection";
import { useState } from "react";



export const usePagination = (course: course | undefined) =>{
    const pageTotal = 5;
    const [thisPage,setThisPage] = useState(1);
    const allPage = Math.ceil(course?course?.attendance[0].att.length:0/pageTotal);
    const getFilteredCourse = <T>(array: T[]): T[] => {
    const data: T[] = [];
    for (let i = pageTotal * (thisPage - 1); i < pageTotal * thisPage && i < array.length; i++) {
        data.push(array[i]);
    }
    return data;
};

    const clickLeft = () =>{
        if(thisPage >1){
            setThisPage(thisPage - 1);
        }
    }
    const clickRight = () =>{
        if(thisPage < allPage){
            setThisPage(thisPage + 1);
        }
    }

    return {getFilteredCourse, thisPage, pageTotal, allPage, clickLeft, clickRight};
}
