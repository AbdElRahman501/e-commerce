import Image from "next/image";
import ArrowButton from "./ArrowButton";
import GoUpButton from "./GoUpButton";
import { categories, footerList } from "@/constants";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-5 bg-primary_color px-5 py-5 md:px-20">
      <div className="flex flex-col gap-5">
        <div className="flex grid-cols-5 flex-col gap-5 px-5 py-5 md:grid">
          {footerList.map((item, index) => (
            <div key={index} className="group flex flex-col gap-1">
              <h1 className="text-2xl font-medium text-white">{item.title}</h1>
              {item.links.map((link, index) => (
                <Link
                  href={link.url}
                  key={index}
                  className="text-base font-medium text-gray-500 duration-300 hover:!text-gray-300  group-hover:text-gray-600"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          ))}
          <div className=" col-span-2 flex flex-col gap-1">
            <h1 className="text-2xl font-medium text-white">
              Printed T-Shirts
            </h1>
            <div className="group flex flex-wrap gap-2">
              {categories.map((item, index) => (
                <Link
                  href={item.url}
                  key={index}
                  className="rounded-full border  border-gray-500 px-3 py-2 text-sm font-medium text-gray-500 duration-300 hover:!border-gray-300 hover:!text-gray-300 group-hover:border-gray-600 group-hover:text-gray-600"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-5 px-5 py-2 md:flex-row">
          <Image
            src="/logo.svg"
            alt="logo"
            width={450}
            height={100}
            className="w-auto"
          />
          <div className="flex flex-col items-center gap-2">
            <GoUpButton />
            <p className="text-base font-medium text-gray-500">
              @2024 GIVACO All Rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
