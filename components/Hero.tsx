"use server";
import Image from "next/image";
import { ArrowButton } from ".";
import Stories from "./Stories";
import { fetchStories } from "@/lib/actions/store.actions";

const Hero = async () => {
  const stories = await fetchStories();
  return (
    <section>
      {/* h-[calc(100vh-4rem)] */}
      <div className=" p-5 lg:px-20 ">
        <div className="flex h-full w-full flex-col-reverse gap-3 md:grid md:grid-cols-9">
          <div className="row-span-1 flex h-full w-full flex-col gap-3 sm:flex-row md:col-span-2 md:flex-col">
            <div className="rounded-4xl relative aspect-square h-full w-full overflow-hidden">
              <Image
                src="/women-collection.png"
                alt="shop image"
                fill
                style={{ objectFit: "cover" }}
              />
              <ArrowButton
                href="/shop?collections=women"
                className="absolute right-3 top-3 bg-white  text-3xl text-black  dark:text-black"
              />
            </div>
            <div className="rounded-4xl relative aspect-square h-full w-full overflow-hidden ">
              <Image
                src="/men-collection.png"
                alt="shop image"
                fill
                style={{ objectFit: "cover" }}
              />
              <ArrowButton
                href="/shop?collections=men"
                className="absolute right-3 top-3 bg-white  text-3xl text-black  dark:text-black"
              />
            </div>
            <div className="rounded-4xl relative h-32 w-full overflow-hidden bg-primary_color p-5 sm:h-full md:h-1/2 ">
              <h1 className="m-5 text-4xl text-white dark:text-white">
                SALE-20%
              </h1>
              <ArrowButton
                href="/shop?kw=SALE-20%"
                className="absolute right-3 top-3 bg-white  text-3xl text-black  dark:text-black "
              />
            </div>
          </div>
          <div className="grid h-full w-full gap-3 max-sm:row-span-3 sm:grid-cols-7 md:col-span-7">
            <div className="rounded-4xl relative col-span-4 hidden overflow-hidden sm:block ">
              <Image
                src="/new-collection.png"
                alt="shop image"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="relative col-span-3 flex w-full flex-col gap-3 sm:flex-col-reverse">
              <Stories stories={stories} />
              <div className="rounded-4xl relative flex h-16 w-full items-center justify-between overflow-hidden bg-primary_color">
                <h1 className=" px-5 text-white dark:text-white">Shop now</h1>
                <div className="aspect-square h-full p-1">
                  <ArrowButton
                    href="/shop"
                    className="m-0 h-full w-full bg-white text-3xl text-black dark:text-black"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
