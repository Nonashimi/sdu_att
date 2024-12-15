import ContainerComponent from '@/components/Container'
import Logo from '@/components/Logo'
import NavBar from '@/components/NavBar'
import SideBar from '@/components/SideBar'
import React from 'react'


const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <ContainerComponent>
        <table className="table-auto w-full ">
            <thead>
                <tr className="">
                    <td className="w-[20%]"><Logo/></td>
                    <td className="w-[80%]"><NavBar/></td>
                </tr>
            </thead>
            <thead>
                <tr>
                    <td className="w-[20%] "><SideBar/></td>
                    <td className="w-[100%] flex flex-col ">{children}</td>
                </tr>
            </thead>
        </table>
    </ContainerComponent>
   

  )
}

export default Layout