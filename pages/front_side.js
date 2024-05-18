import React from 'react'
import LayoutDetail from "../components/LayoutDetail";
import Link from "next/link";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import FormatColorFillOutlinedIcon from '@mui/icons-material/FormatColorFillOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import InterestsOutlinedIcon from '@mui/icons-material/InterestsOutlined';
import AddHomeOutlinedIcon from '@mui/icons-material/AddHomeOutlined';
export default function Home() {
    const menuItem = [
        {
          title: "T-Shirt",
          image: '/assets/OFF-STYLE/2.png',
        },
      ];
  return (
     <div>
        <LayoutDetail>
        <div className="px-4">
            <p className="font-bold text-4xl px-2 border-solid border-2 border-black"> New T-Shirt Design </p>
            <p className="font-bold text-base text-gray-500 px-2 py-4"> Tip: You can change the project title! </p>
            <div className="flex justify-between items-center mb-4">
                {/* Menu bar dengan judul */}
                <div className="flex items-center">
                    <Link href="/">
                        <div className="mr-4 flex items-center">
                            <ArrowBackOutlinedIcon className="w-6 h-6 text-white" />
                            <span className="ml-2">Go Back</span>
                        </div>
                    </Link>
                    {/* Tambahkan menu bar lainnya di sini jika diperlukan */}
                    <Link href="/cart">
                        <div className="mr-4 flex items-center">
                            <FormatColorFillOutlinedIcon className="w-6 h-6" />
                            <span className="ml-2">Background Color</span>
                        </div>
                    </Link>
                    <Link href="/profile">
                        <div className="mr-4 flex items-center">
                            <AddPhotoAlternateOutlinedIcon className="w-6 h-6" />
                            <span className="ml-2">Image Upload</span>
                        </div>
                    </Link>
                    <Link href="/profile">
                        <div className="mr-4 flex items-center">
                            <InterestsOutlinedIcon className="w-6 h-6" />
                            <span className="ml-2">Insert Shapes</span>
                        </div>
                    </Link>
                    <Link href="/profile">
                        <div className="mr-4 flex items-center">
                            <AddHomeOutlinedIcon  className="w-6 h-6 " />
                            <span className="ml-2">Material</span>
                        </div>
                    </Link>
                </div>
            </div>
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
