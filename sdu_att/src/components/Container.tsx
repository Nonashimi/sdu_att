import React from "react"

interface ContainerProps {
    children: React.ReactNode
}

const ContainerComponent = ({children} : ContainerProps) => {
  return (
    <div className='w-[1000px] my-0 mx-auto'>{children}</div>
  )
}

export default ContainerComponent