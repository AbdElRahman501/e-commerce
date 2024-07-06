"use server";
import Image from "next/image";
import { fetchCollections, fetchStories } from "@/lib/actions/store.actions";
import Link from "next/link";
import CollectionCard from "./CollectionCard";
import ArrowButton from "./ArrowButton";
import Stories from "./Stories";

const Hero = async () => {
  const stories = await fetchStories();
  const collections = await fetchCollections();
  const [firstCollection, ...restCollections] = collections.slice(0, 3);
  return (
    <div className=" mx-auto max-w-8xl sm:p-5 lg:px-20 ">
      <div className="flex h-full w-full flex-col-reverse gap-3 md:grid md:grid-cols-9">
        <div className="grid w-full grid-cols-2 flex-col gap-3 px-5 sm:px-0 md:col-span-2 md:flex md:flex-col">
          {restCollections.map((collection, index) => (
            <CollectionCard key={index} index={index} {...collection} />
          ))}
          <Link
            href={"/collections"}
            className="rounded-4xl relative col-span-2 flex h-32 w-full items-end overflow-hidden bg-primary_color p-5 sm:h-full md:h-1/2 "
          >
            <h1 className="text-2xl font-black uppercase text-white drop-shadow-white dark:text-white md:text-lg">
              All Collections
            </h1>
            <ArrowButton className="absolute right-3 top-3 bg-white  text-3xl text-black  hover:bg-black hover:text-white  " />
          </Link>
        </div>
        <div className="flex h-full  w-full flex-col-reverse gap-3 max-sm:row-span-3 sm:grid sm:grid-cols-7 md:col-span-7">
          <Link
            href={firstCollection.url}
            className="rounded-4xl relative col-span-4 mx-5 overflow-hidden max-sm:aspect-square sm:mx-0 "
          >
            <Image
              src={firstCollection.image}
              alt={firstCollection.name}
              fill
              priority
              sizes="100%"
              style={{ objectFit: "cover" }}
            />
            <ArrowButton className="absolute right-3 top-3 bg-white  text-3xl text-black  hover:bg-black hover:text-white " />
          </Link>
          <div className="relative col-span-3 flex w-full flex-col gap-3 sm:flex-col-reverse">
            <Stories stories={stories} />
            <div className="rounded-4xl absolute bottom-8 left-5 flex h-16  w-5/12 items-center justify-between overflow-hidden bg-primary_color sm:static sm:w-full">
              <h1 className=" w-full text-center font-bold uppercase text-white sm:px-5 sm:text-left">
                Shop now
              </h1>
              <div className="aspect-square h-full p-1">
                <ArrowButton
                  href="/shop"
                  className="m-0 h-full w-full bg-white  text-3xl text-black  hover:bg-black hover:text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
