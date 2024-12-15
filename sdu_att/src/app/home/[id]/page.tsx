"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import stu_photo from "../../../../public/stud_photo.jpeg";
import { useSelector } from "react-redux";
import { stateUser, user } from "@/redux/slice/usersSlice";

const Page = ({ params }: { params: { id?: string } }) => {
  const { users } = useSelector((state: { users: stateUser }) => state.users);
  const [userInfo, setUserInfo] = useState<user | undefined>(undefined);

  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (userId) {
      setUserInfo(users.find(u => u.number === userId));
    }
  }, [users]);


  const keys = userInfo ? Object.keys(userInfo) : [];

  return (
    <div>
      <h2 className="text-[#CC4200] text-[26px] font-bold">Home Page</h2>
      <div className="w-[100%] px-[10px] box-border flex items-start gap-[10px]">
        <Image src={stu_photo} width={130} alt="photo" height={160} />
        <table className="text-[13px] border">
          <tbody>
            {keys.map(key => (
              <tr key={key}>
                <td className="border text-gray-600 py-[3px] px-[5px]">
                  {key}
                </td>
                <td className="border font-bold py-[3px] px-[5px]">
                  {userInfo?.[key]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
