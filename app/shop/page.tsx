import {
  CallToAction,
  FilterButton,
  FilterContainer,
  ProductCard,
  SearchField,
} from "@/components";
import Image from "next/image";

const page = () => {
  return (
    <main>
      <CallToAction />
      <div className="flex  items-center justify-between gap-3 px-5 lg:px-20">
        <h1 className="hidden text-3xl font-bold md:block">Products</h1>
        <SearchField />
        <FilterButton />
        <div className="hidden h-14 w-max flex-nowrap items-center gap-3 rounded-2xl  border px-2 md:flex">
          {/* <span className="sort-icon aspect-square w-6 text-2xl">&#8645;</span> */}
          <Image
            src={"/icons/sort.svg"}
            width={24}
            height={24}
            alt={"sort icon"}
          />
          <span className="whitespace-nowrap  text-sm">
            Price - Low to High
          </span>
          {/* <span className="down-arrow aspect-square w-6 rotate-90 text-center text-3xl ">
            &#8250;
          </span> */}
          <Image
            src={"/icons/arrow-down.svg"}
            width={24}
            height={24}
            alt={"sort icon"}
          />
        </div>
      </div>
      <div className="flex  gap-4 p-5 lg:px-20">
        <FilterContainer />
        <div className="rounded-4xl flex flex-col gap-4  ">
          <div className="products grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-3  2xl:grid-cols-4">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
