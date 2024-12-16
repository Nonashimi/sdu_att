"use client";
import React, { useEffect } from "react";
import logo from "/public/login-logo-ps.png"; 
import Image from "next/image";
import { useRouter } from "next/navigation";
import { store } from "@/redux/store/store";
import { changeId } from "@/redux/slice/IdSlice";
import { useAuth } from "@/hooks/useAuthentififcation";
import { fetchUsers, stateUser } from "@/redux/slice/usersSlice";
import { useSelector } from "react-redux";

export interface user {
  number: string;
  password: string;
  name: string;
}

const Page = () => {
  const router = useRouter();
  const { user, handleUserNumber, handleUserPassword } = useAuth();
  const { users } = useSelector((state: { users: stateUser }) => state.users);

  useEffect(() => {
    fetchUsersEL();
  }, []);

  const fetchUsersEL = async () => {
    await store.dispatch(fetchUsers());
  };

  const checkUser = async (number: string, password: string) => {
    console.log(users);
    console.log(number, password);
    const user = users.find(
      (user) => user.number === number && user.pass === password
    );
    return user;
  };

  const clickBtn = async () => {
    if (user.number === "" || user.password === "") {
      alert("Fill all the input fields");
    } else {
      const foundedUser = await checkUser(user.number, user.password);
      if (foundedUser) {
        store.dispatch(changeId(foundedUser.number));
        localStorage.setItem("id", foundedUser.number);
        router.push(`/home/${foundedUser.number}`);
      } else {
        alert("User does not exist or incorrect password");
      }
    }
  };

  return (
    <div className="">
      <header className="flex justify-center border border-t-8 border-b-8 border-[#16296E] mt-8">
        <Image src={logo} width={400} height={148} alt="logo" priority />
      </header>

      <div className="auth_block w-[350px] h-[300px] border border-2 border-[#16296E] mx-auto my-[50px] p-2 box-border rounded-[4px]">
        <div className="auth_inner bg-[#f1f1f1] w-[100%] h-[100%] rounded-[4px] flex flex-col justify-center items-center">
          <div className="w-[80%]">
            <div className="text-[#999] text-[18px]">Student Information System</div>
            <div className="w-[100%] mt-3">
              <div className="text-[#005490] font-bold text-[14px]">
                Student Number
              </div>
              <input
                value={user.number}
                onChange={(e) => handleUserNumber(e.target.value)}
                type="text"
                className="w-[100%] border border-black outline-none px-[5px] py-[5px]"
              />
            </div>
            <div className="w-[100%]">
              <div className="text-[#005490] font-bold text-[14px]">Password</div>
              <input
                value={user.password}
                onChange={(e) => handleUserPassword(e.target.value)}
                type="password"
                className="w-[100%] border border-black outline-none px-[5px] py-[3px]"
              />
            </div>
            <button
              onClick={clickBtn}
              type="button"
              className="border border-black rounded-[2px] text-[13px] py-[2px] px-[5px] mt-3 hover:bg-gray-300"
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
