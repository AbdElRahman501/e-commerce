import { Suspense } from "react";
import dynamic from "next/dynamic";
import { FilterSkeleton } from "@/components/LoadingSkeleton";
import { CallToAction, Footer, SearchField, Sorting } from "@/components";
import FilterSection from "@/components/FilterSection";
import { FilterBar } from "@/components/FilterBar";

const FilterButton = dynamic(() => import("@/components/FilterButton"));

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
        <Sorting classNames=" ml-auto hidden h-14  min-w-max flex-nowrap items-center gap-3 rounded-3xl  border border-gray-200 px-2 dark:border-gray-700 md:flex" />
      </div>
      <FilterBar />
      <div className="flex gap-4 p-5 lg:px-20">
        <Suspense fallback={<FilterSkeleton />}>
          <FilterSection />
        </Suspense>
        <div className="rounded-4xl flex min-h-[60vh] flex-1 flex-col gap-4  ">
          <Suspense>{children}</Suspense>
        </div>
      </div>
      <Suspense>
        <Footer />
      </Suspense>
    </Suspense>
  );
}
