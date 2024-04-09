"use server";
import Image from "next/image";
import { ArrowButton } from ".";
import Stories from "./Stories";
import { fetchStories } from "@/lib/actions/store.actions";
import { collections } from "@/constants";
import CollectionCard from "./CollectionCard";

const Hero = async () => {
  const stories = await fetchStories();
  const [firstCollection, ...restCollections] = collections.slice(0, 3);
  return (
    <section>
      <div className=" sm:p-5 lg:px-20 ">
        <div className="flex h-full w-full flex-col-reverse gap-3 md:grid md:grid-cols-9">
          <div className=" row-span-1 grid h-full w-full grid-cols-2 flex-col gap-3 px-5 sm:flex sm:flex-row sm:px-0 md:col-span-2 md:flex-col">
            {restCollections.map((collection) => (
              <CollectionCard key={collection.name} {...collection} />
            ))}
            <div className="rounded-4xl relative col-span-2 flex h-32 w-full items-end overflow-hidden bg-primary_color p-5 sm:h-full md:h-1/2 ">
              <h1 className="text-2xl font-bold uppercase text-white dark:text-white">
                All Collections
              </h1>
              <ArrowButton
                href="/collections"
                className="absolute right-3 top-3 bg-white  text-3xl text-black  dark:text-black "
              />
            </div>
          </div>
          <div className="flex h-full  w-full flex-col-reverse gap-3 max-sm:row-span-3 sm:grid sm:grid-cols-7 md:col-span-7">
            <div className="rounded-4xl relative col-span-4 mx-5 overflow-hidden max-sm:aspect-square sm:mx-0 ">
              <Image
                src={firstCollection.image}
                alt={firstCollection.name}
                fill
                sizes="100%"
                style={{ objectFit: "cover" }}
              />
              <ArrowButton
                href={firstCollection.url}
                className="absolute right-3 top-3 bg-white  text-3xl text-black  dark:text-black"
              />
            </div>
            <div className="relative col-span-3 flex w-full flex-col gap-3 sm:flex-col-reverse">
              <Stories stories={stories} />
              <div className="rounded-4xl absolute bottom-8 left-5 flex h-16  w-5/12 items-center justify-between overflow-hidden bg-white sm:static sm:w-full sm:bg-primary_color">
                <h1 className=" w-full text-center font-bold uppercase text-black sm:px-5 sm:text-left sm:text-white sm:dark:text-white">
                  Shop now
                </h1>
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
