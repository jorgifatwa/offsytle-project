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
          link: '/back_side'
        },
      ];
  return (
     <div>
        <LayoutDetail>
        <div className="px-4">
            <p className="font-bold text-4xl px-2 border-solid border-2 border-black"> New T-Shirt Design </p>
            <p className="font-bold text-lg text-gray-500 px-2 pt-4"> Click any side to start the edit... </p>
            <p className="font-bold text-base text-gray-500 px-2 py-4"> Tip: You can change the project title! </p>
            
            <div className="container bg-white mx-auto px-4 border-2 border-black">
                <div className="w-full h-full mx-auto p-4 py-4 grid md:grid-cols-1">
                    {menuItem.map(({ title, image }, index) => {
                        return (
                        <div key={index} className="rounded-xl relative">
                            <div className="w-auto rounded-xl flex justify-center">
                                <div className="absolute bg-black/50 rounded-xl text-white">
                                <p className="font-bold text-2xl px-2 pt-4">{title} </p>
                                </div>
                                <img src={image}
                                alt="Product" className="max-h-80 max-w-80 w-full h-full object-cover rounded-xl" /> 
                            </div>
                        </div>
                        );
                    })}
                </div>
                
                <div className="w-full h-full mx-auto p-4 py-4 grid md:grid-cols-2 gap-6">
                    {menuItem1.map(({ title, image, link }, index) => (
                        <Link href={link} key={index}>
                            <div className="relative">
                                <div className="w-full h-full bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl relative overflow-hidden">
                                    <img src={image} alt="Product" className="w-full h-full object-cover rounded-xl" />
                                    <div className="absolute top-0 left-0 bg-black/50 rounded-tl-xl text-white">
                                        <p className="font-bold text-2xl px-2 pt-2">{title}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="container items-center mx-auto py-4">
                <a href="#" title=""
                    className="relative z-10 inline-flex items-center justify-center w-full px-3 py-3 text-lg font-bold text-white border-2 border-transparent rounded-xl font-pj"
                    role="button">
                    View Result
                </a>
            </div>
        </div>
        </LayoutDetail>
     </div>
  )
}
