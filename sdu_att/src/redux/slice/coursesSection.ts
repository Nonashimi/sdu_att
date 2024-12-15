import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

interface atten {
  id: number,
  att: number[]
}

export interface  course {
  id: number,
  course_name: string,
  lecture_id: number,
  students_id: number[],
  attendance: atten[]

}
export interface stateCourses{
  courses: course[],
  loading: boolean,
  error: string | null
}

const initialState:stateCourses = {
    courses: [],
    loading: false,
    error: null
};


export const fetchCourses = createAsyncThunk<any[]>("courses/fetchCourses", async() =>{
    const {data} = await axios.get("https://81f65749004d8789.mokky.dev/courses");
    return data;
});

export const updateAttendanceForCourse = createAsyncThunk(
  "courses/updateAttendance", async({course_id, attendance}: {course_id: number; attendance:atten[]}) =>{
    const {data} = await axios.patch("https://81f65749004d8789.mokky.dev/courses/" + course_id, {attendance});
    return data;
  }
);


const coursesSLice = createSlice({
    name: "courses",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
           // pending
           builder.addCase(fetchCourses.pending, (state, action) =>{
            state.loading = true;
        })
        // fulfilled
        builder.addCase(fetchCourses.fulfilled, (state, action) =>{
            state.courses = action.payload;
            state.loading = false;
        })
        // rejected
        builder.addCase(fetchCourses.rejected, (state, action) =>{
            state.courses = [];
            state.loading = false;
            state.error = action.error.message || "An error occurred";
        })

        "update attendance"
        builder.addCase(updateAttendanceForCourse.pending, (state) => {
          state.loading = true;
        })
        builder.addCase(updateAttendanceForCourse.fulfilled, (state, action) => {
          const updatedCourse = action.payload;
          const index = state.courses.findIndex((course) => course.id === updatedCourse.id);
          if(index != -1)
          state.courses[index] = updatedCourse;
          state.loading = false;
        })
        builder.addCase(updateAttendanceForCourse.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Failed to update attendance";
        });
    }
});

export const coursesReducer = coursesSLice.reducer;