import Layout from "../components/Layout";
import Link from "next/link";
export default function Home() {
  const menuItem = [
    {
        title: "Hat",
        subtitle: "Hat",
        image: 'assets/OFF-STYLE/1.png',
        link: "/template",
        description: "Hat Descrption",
    },
    {
        title: "T-Shirt",
        subtitle: "T-Shirt",
        image: 'assets/OFF-STYLE/2.png',
        link: "/template",
        description: "T-Shirt Descrption",
    },
    {
        title: "Hoodie",
        subtitle: "Hoodie",
        image: 'assets/OFF-STYLE/3.png',
        link: "/template",
        description: "Hoodie Descrption",
    },
    {
        title: "Sweater",
        subtitle: "Sweater",
        image: 'assets/OFF-STYLE/4.png',
        link: "/template",
        description: "Sweater Descrption",
    },
    {
        title: "Sweetpants",
        subtitle: "Sweetpants",
        image: 'assets/OFF-STYLE/5.png',
        link: "/template",
        description: "Sweetpants Descrption",
    },
    {
        title: "Short",
        subtitle: "Short",
        image: 'assets/OFF-STYLE/6.png',
        link: "/template",
        description: "Short Descrption",
    },
  ];
  return (
     <Layout>
     <div>
      <p className="font-bold text-4xl px-2 pt-4"> Choose Design Template... </p>
      <div className="w-full h-full mx-auto p-4 py-12 grid md:grid-cols-3 gap-6">
        {menuItem.map(({ title, subtitle, image, description, link }, index) => (
          <div key={index} className="rounded-xl relative">
            <div className="w-auto bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl relative">
            <Link href={link}>
              <div className="absolute bg-black/50 rounded-xl text-white">
                <p className="font-bold text-2xl px-2 pt-4">{title}</p>
              </div>
              <img
                src={image}
                alt="Product"
                className="max-h-80 max-w-80 w-full h-full object-cover rounded-xl"
                style={{ objectFit: 'cover' }} // Apply object-fit: cover here
              />
              <div className="px-4 py-3 w-auto">
                <p className="text-lg font-bold text-text-light truncate block capitalize">
                  {subtitle}
                </p>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-text-light cursor-auto my-3">
                    {description}
                  </p>
                </div>
              </div>
            </Link>
          </div>
          </div>
        ))}
      </div>
    </div>;
     </Layout>
  )
}
