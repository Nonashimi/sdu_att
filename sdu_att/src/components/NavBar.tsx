"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import book_icon from "../../public/book_icon.png";
import { useSelector } from "react-redux";
import { sectionState } from "@/redux/slice/sectionSlice";
import stu_photo from "../../public/stud_photo.jpeg";
import { fetchUsers, stateUser, user } from "@/redux/slice/usersSlice";
import { store } from "@/redux/store/store";

const NavBar = () => {
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    useEffect(() => {
        store.dispatch(fetchUsers());
        const id = localStorage.getItem("id");
        setCurrentUserId(id);
    }, []);


    const { section } = useSelector((state: { section: sectionState }) => state.section);
   
    const { users } = useSelector((state: { users: stateUser }) => state.users);
    
    const userInfo:user|undefined = users.find(user => user.number === currentUserId);
    const isTeacher: boolean = userInfo?.status === "Student";

    
    const renderUserAttributes = (user: user) => {
        const excludedKeys = ["id"]; 
        return (
            <div className="flex flex-col gap-[3px]">
                {Object.keys(user)
                    .filter((key) => !excludedKeys.includes(key))
                    .map((key) => (
                        <div key={key} className="flex gap-2 text-[13px]">
                            <strong>{key}:</strong> <span>{user[key]}</span>
                        </div>
                    ))}
            </div>
        );
    };

    return (
        <header className="flex items-center justify-between h-[134px]">
            <div className="inline-block">
                {isTeacher ? (
                    <div className="text-[#00B3DF]">Teacher Information System</div>
                ) : (
                    <div className="text-[#00B3DF]">Student Information System</div>
                )}
                <div className="flex w-auto justify-center gap-2 items-center py-[2px] bg-[#00B3DF] text-white">
                    <Image src={book_icon} alt="Book Icon" width={18} height={18} />
                    <a href="https://my.sdu.edu.kz/common/download/handbook.pdf">Portal Guideline</a>
                </div>
            </div>

            {section[0]?.choosed ? (
                <div></div>
            ) : (
                <div className="flex items-center justify-between gap-[10px]">
                    <div className="w-[250px]">
                        <div className="forms flex flex-col gap-[5px]">
                            {userInfo ? (
                                renderUserAttributes(userInfo)
                            ) : (
                                <div>No user data found</div>
                            )}
                        </div>
                    </div>
                    <div className="w-[100px]">
                        <Image src={stu_photo} width={130} alt="Student Photo" height={160} />
                    </div>
                </div>
            )}
        </header>
    );
};

export default NavBar;
