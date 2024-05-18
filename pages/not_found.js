import React from 'react'
import LayoutDetail from "../components/LayoutDetail";
import Link from "next/link";
export default function Home() {
    const menuItem = [
        {
          title: "T-Shirt",
          image: '/assets/OFF-STYLE/2.png',
        },
      ];
  
      const menuItem1 = [
        {
          title: "Front Size",
          image: '/assets/OFF-STYLE/2.png',
          link: '/front_side'
        },
        {
          title: "Back Size",
          image: '/assets/OFF-STYLE/3.png',
          link: '/front_side'
        },
      ];
  return (
     <div>
        <LayoutDetail>Sorry this page under construction</LayoutDetail>
     </div>
  )
}