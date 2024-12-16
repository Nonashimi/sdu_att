import { course, fetchCourses, stateCourses } from "@/redux/slice/coursesSection";
import { fetchLectors, lector, stateLectors } from "@/redux/slice/lectoreSlice";
import { fetchUsers, stateUser } from "@/redux/slice/usersSlice";
import { store } from "@/redux/store/store";
import {useEffect, useState } from "react";
import { useSelector } from "react-redux";


export const useAuth = () =>{
    const [user, setUser] = useState<{number:string, password: string}>({number:"", password: ""});
    const handleUserNumber = (value:string) =>{
        setUser(prev => ({ ...prev, number: value }));
    }
    
    const handleUserPassword = (value: string) =>{
        setUser(prev => ({ ...prev, password: value }));
        console.log(value);
    }

    return {user, handleUserNumber, handleUserPassword};
}


export const getNameLectors = (lector_id:number, lectors:lector[]) =>{
    const lector_fullname = lectors.find(lector => lector.id == lector_id)?.name_surname;
    if(lector_fullname)
        return lector_fullname
    return "not found";
}

export const useLectorsAndCourses = () =>{
    const {courses} = useSelector((state: {courses: stateCourses}) => state.courses);
    const {lectors} = useSelector((state: {lectors: stateLectors}) => state.lectors);
    const fetchCoursesComponent = async() =>{
        await store.dispatch(fetchCourses());
    }
    const fetchLectorsComponent = async() =>{
        await store.dispatch(fetchLectors());
    }
    const fetcData = async() =>{
        await fetchCoursesComponent();
        await fetchLectorsComponent();
    }    
    useEffect(() =>{
        fetcData();
    },[]);


    return {courses, lectors};
}

export const getCourse = (id:number, courses:course[]) =>{
    return courses.find(course => course.id == id);
}

export const useFetchUsers = () => {
  const { users } = useSelector((state: { users: stateUser }) => state.users);

  useEffect(() => {
    const fetchingUsers = async () => {
      await store.dispatch(fetchUsers());
    };

    fetchingUsers();
  }, []); 

  return users;
};


export const useFetchIdByParams = (params: Promise<{ id: number }>) => {
    const [id, setId] = useState(-1);

    useEffect(() => {
        let isMounted = true; 

        const fetchIdByParams = async () => {
            const result = await params;
            if (isMounted) setId(result.id); 
        };

        fetchIdByParams();

        return () => {
            isMounted = false; 
        };
    }, [params]);

    return id;
};
