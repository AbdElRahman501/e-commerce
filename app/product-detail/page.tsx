import { ProductsRow } from "@/components";
import { faqSection, filterData } from "@/constants";
import Image from "next/image";

const page = () => {
  return (
    <main>
      <div className="flex flex-col gap-4 bg-white dark:bg-primary_bg sm:flex-row sm:p-5 lg:px-20">
        <div className="sticky top-0 grid h-full w-full min-w-[50vw] flex-1 gap-2 sm:relative sm:grid-cols-4  md:min-w-[40vw] lg:min-w-[30vw]">
          <div className="aspect-card col-span-4 max-h-full overflow-hidden sm:relative sm:rounded-3xl">
            <Image
              src="/jacket.png"
              alt="jacket"
              fill
              className="duration-300 hover:scale-110"
            />
          </div>
          <div className="absolute bottom-0 col-span-4 flex w-full grid-cols-4 grid-rows-2 justify-center gap-2 p-2 sm:relative sm:grid">
            <div className="aspect-card relative col-span-2 row-span-2 max-h-full w-10 overflow-hidden  rounded-xl sm:w-auto sm:rounded-3xl">
              <Image
                src="/jacket.png"
                alt="jacket"
                fill
                className="duration-300 hover:scale-110"
              />
            </div>
            <div className="aspect-card relative max-h-full w-10 overflow-hidden rounded-xl sm:w-auto sm:rounded-3xl">
              <Image
                src="/jacket.png"
                alt="jacket"
                fill
                className="duration-300 hover:scale-110"
              />
            </div>
            <div className="aspect-card relative max-h-full w-10 overflow-hidden rounded-xl sm:w-auto sm:rounded-3xl">
              <Image
                src="/jacket.png"
                alt="jacket"
                fill
                className="duration-300 hover:scale-110"
              />
            </div>
            <div className="aspect-card relative max-h-full w-10 overflow-hidden rounded-xl sm:w-auto sm:rounded-3xl">
              <Image
                src="/jacket.png"
                alt="jacket"
                fill
                className="duration-300 hover:scale-110"
              />
            </div>
            <div className="aspect-card relative max-h-full w-10 overflow-hidden rounded-xl sm:w-auto sm:rounded-3xl">
              <Image
                src="/jacket.png"
                alt="jacket"
                fill
                className="duration-300 hover:scale-110"
              />
            </div>
          </div>
        </div>

        <div className="z-10 flex flex-col gap-3 bg-white p-5 dark:bg-primary_bg md:col-span-2 md:py-0">
          <div className="nav text-xs text-gray-400">
            <span>Category</span>
            <span className="mx-1 text-base">&#8250;</span>
            <span>Winter Collection</span>
          </div>
          <h6 className="text-lg ">
            Lorem Ipsum is simply dummy text of the printing
          </h6>
          <p className="text-sm text-gray-400 ">Mystic Clover Power</p>
          <h5 className="text-xl font-bold">700 EGP</h5>
          <div className="flex flex-col gap-3">
            <h1 className="text-lg font-bold text-primary_color dark:text-white">
              Sizes
            </h1>
            <div className="flex flex-wrap gap-1">
              {filterData.sizes.map((item, index) => (
                <button
                  key={index}
                  className="flex h-10 w-14 items-center justify-center rounded-xl border border-primary_bg py-1 text-lg text-primary_color dark:border-white dark:text-white "
                >
                  <span>{item}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-lg font-bold text-primary_color dark:text-white">
              Colors
            </h1>
            <div className="flex flex-wrap gap-1">
              {filterData.colors.map((item, index) => (
                <button
                  key={index}
                  style={{ backgroundColor: item }}
                  className="h-10 w-10 rounded-full duration-200 hover:scale-110"
                ></button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-lg font-bold text-primary_color dark:text-white">
              Amount
            </h1>
            <div className="flex h-11 max-w-max justify-between gap-1 rounded-2xl border border-primary_color dark:border-white ">
              <button className="w-10 flex-1 text-2xl">
                <span>&#8722;</span>
              </button>
              <input
                type="number"
                value={1}
                className="w-10 bg-transparent text-center outline-none "
              />
              <button className="w-10 flex-1 text-2xl">
                <span>&#43;</span>
              </button>
            </div>
          </div>
          <div className="mt-3 flex max-w-md items-center justify-between gap-3">
            <button className=" flex h-12 w-full items-center gap-3 rounded-full bg-primary_color p-1 text-white">
              <div className="flex aspect-square h-10 w-10 items-center justify-center rounded-full bg-white ">
                <Image
                  src="/icons/cart.svg"
                  alt="cart icon"
                  width={24}
                  height={24}
                  className="duration-200 hover:scale-110 "
                />
              </div>
              <p className="w-full text-center text-lg">Add to cart</p>
            </button>
            <div className="flex aspect-square h-12 w-12 items-center justify-center rounded-full border  border-primary_bg bg-white py-1 text-lg dark:border-white ">
              <Image
                src="/icons/heart.svg"
                alt="heart icon"
                width={24}
                height={24}
                className="duration-200 hover:scale-110"
              />
            </div>
          </div>
          <div className="mt-10">
            {faqSection.map((item, index) => (
              <div key={index} className="group">
                <div className="flex items-center justify-between gap-3 border-b-2 border-gray-300 pb-3 ">
                  <h1 className="question text-base font-medium duration-300 group-hover:scale-105">
                    {item.question}
                  </h1>
                  <h1 className="question text-2xl font-medium duration-300 group-hover:rotate-45 group-hover:scale-110  ">
                    <span>&#43;</span>
                  </h1>
                </div>
                <div className="answer max-h-0 overflow-hidden text-sm font-medium text-gray-500 transition-all duration-1000  group-hover:max-h-96">
                  <p className="pb-3">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ProductsRow />
    </main>
  );
};

export default page;
