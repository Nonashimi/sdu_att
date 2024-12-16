"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import stu_photo from "../../../../public/yernar.jpg";
import { useSelector } from "react-redux";
import { stateUser, user } from "@/redux/slice/usersSlice";
import { StateId } from "@/redux/slice/IdSlice";

const Page = () => {
  const { users } = useSelector((state: { users: stateUser }) => state.users);
  const [userInfo, setUserInfo] = useState<user | null>(null);
  const userId = useSelector((state: {id: StateId}) => state.id.id);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (userId && users.length > 0) {
        const foundUser = users.find((u) => u.number === userId);
        setUserInfo(foundUser || null); 
      }
    }
  }, [users]);

  const keys = userInfo ? Object.keys(userInfo) : [];

  return (
    <div>
      <h2 className="text-[#CC4200] text-[26px] font-bold">Home Page</h2>
      <div className="w-[100%] px-[10px] box-border flex items-start gap-[10px]">
        <Image className="w-[130px] h-[160px] object-cover" src={stu_photo} width={130} height={160} alt="photo" priority />
        <table className="text-[13px] border">
          <tbody>
            {keys.map((key) => (
              
                key =="pass"? "":<tr key={key}>
                <td className="border text-gray-600 py-[3px] px-[5px]">
                  {key}
                </td>
                <td className="border font-bold py-[3px] px-[5px]">
                  {userInfo?.[key as keyof user]}
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
