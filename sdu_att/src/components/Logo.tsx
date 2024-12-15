import Image from 'next/image'
import React from 'react'
import sdu_logo from "../../public/sdu_logo.png"

const Logo = () => {
  return (
    <Image src={sdu_logo} width={120} height={120} alt="placeholder"/>
  )
}

export default Logo