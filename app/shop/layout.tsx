import { Suspense } from "react";
import dynamic from "next/dynamic";

const CallToAction = dynamic(() => import("@/components/CallToAction"));
const Footer = dynamic(() => import("@/components/Footer"));
const FilterButton = dynamic(() => import("@/components/FilterButton"));
const SearchField = dynamic(() => import("@/components/SearchField"));
const Sorting = dynamic(() => import("@/components/Sorting"));
const FilterSection = dynamic(() => import("@/components/FilterSection"));

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <CallToAction />
      <div className="flex items-center justify-center gap-3 px-5 md:gap-5 lg:px-20">
        <h1 className=" mr-auto hidden text-3xl font-bold md:block">
          Products
        </h1>
        <SearchField />
        <FilterButton />
        <Sorting classNames=" ml-auto hidden h-14  min-w-max flex-nowrap items-center gap-3 rounded-3xl  border border-black px-2 dark:border-white md:flex" />
      </div>
      <div className="flex gap-4 p-5 lg:px-20">
        <Suspense>
          <FilterSection />
        </Suspense>
        <div className="rounded-4xl flex min-h-[60vh] flex-1 flex-col gap-4  ">
          {children}
        </div>
      </div>
      <Suspense>
        <Footer />
      </Suspense>
    </Suspense>
  );
}
