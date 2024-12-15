import { course, fetchCourses, stateCourses } from "@/redux/slice/coursesSection";
import { fetchLectors, lector, stateLectors } from "@/redux/slice/lectoreSlice";
import { fetchUsers, stateUser } from "@/redux/slice/usersSlice";
import { store } from "@/redux/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


export const useAuth = () =>{
    const [user, setUser] = useState<{number:string, password: string}>({number:"", password: ""});
    const handleUserNumber = (value:string) =>{
       setUser({...user, number: value});
    }
    const handleUserPassword = (value: string) =>{
        setUser({...user, password: value});
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
    const {lectors, error} = useSelector((state: {lectors: stateLectors}) => state.lectors);
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

export const usefetchUsers = () =>{
    const {users} = useSelector((state: {users: stateUser}) => state.users);
    const fetchingUsers = async() =>{
        await store.dispatch(fetchUsers());
    }

    useEffect(() =>{
        fetchingUsers();
    },[]);

    return users;
}



export const useFetchIdByParams = (params:Promise<{id: number}>) =>{
    let [id, setId] = useState(-1);
    const fetchIdByparams = async() =>{
        setId((await params).id);
   }
   useEffect(() =>{
        fetchIdByparams();
   },[params]);


   return id;
}