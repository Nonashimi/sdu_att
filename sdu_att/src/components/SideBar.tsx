"use client";

import { stateId } from '@/redux/slice/IdSlice';
import { chooseOne, sectionState } from '@/redux/slice/sectionSlice';
import { store } from '@/redux/store/store';
import Link from 'next/link';
import React from 'react'
import { useSelector } from 'react-redux';
interface items{
    category?: string,
    subItems: {title: string, href:string, choosed?:boolean}[],
}
const SideBar = () => {
    const {section} = useSelector((state:{section:sectionState}) => state.section);
    const menuItems: items[] = [
      {
        subItems:section
      },
      
      {
        category: "Information",
        subItems: [
          { title: "Curricula", href: `other` },
          { title: "My Curriculum", href: `other` },
          { title: "Transcript", href: `other` },
          { title: "Grades List", href: `other` },
          { title: "Course Schedule", href: `other` },
          { title: "Accounting Info", href: `other` },
          { title: "Electronic Attendance", href: `other` },
          { title: "System Calendar", href: `other` },
          { title: "Gate Entry Records", href: `other` },
          { title: "Rules and Regulation", href: `other` }
        ]
      }
    ];
    

    const isActive = "bg-blue-300 underline";
      
  return (
    <nav className="list-none my-[30px]">
      {menuItems.map((item, index) => 
        (   <div className="" key={index}>
                <h2 className='text-gray-500 pt-2'>{item?.category}</h2>
                <nav className='flex-col gap-1'>
                    {item.subItems.map((i,index) => 
                      <Link key={index} href={i.href}>
                          <li onClick={() => store.dispatch(chooseOne(i.title))}  className = {`text-blue-700 py-[3px] px-2 border cursor-pointer hover:underline ${i.choosed?isActive:""}`}>{i.title}</li>
                      </Link>
                    )}
                </nav>
            </div>
            
        )
      )}
    </nav>
  )
}

export default SideBar