import {
  CallToAction,
  FilterButton,
  FilterContainer,
  ProductCard,
  SearchField,
} from "@/components";
import { products } from "@/constants";
import Image from "next/image";

const ShopPage = () => {
  const productsList = Array(3).fill(products).flat();
  return (
    <main>
      <CallToAction />
      <div className="flex items-center justify-center gap-3 px-5 md:gap-5 lg:px-20">
        <h1 className=" mr-auto hidden text-3xl font-bold md:block">
          Products
        </h1>
        <SearchField />
        <FilterButton />
        <div className=" ml-auto hidden h-14  min-w-max flex-nowrap items-center gap-3 rounded-3xl  border border-black px-2 dark:border-white md:flex">
          {/* <span className="sort-icon aspect-square w-6 text-2xl">&#8645;</span> */}
          <Image
            src={"/icons/sort.svg"}
            width={24}
            height={24}
            alt={"sort icon"}
            className="dark:invert"
          />
          <span className="whitespace-nowrap  text-sm">Price Low to High</span>
          {/* <span className="down-arrow aspect-square w-6 rotate-90 text-center text-3xl ">
            &#8250;
          </span> */}
          <Image
            src={"/icons/arrow-down.svg"}
            width={24}
            height={24}
            alt={"sort icon"}
            className="dark:invert"
          />
        </div>
      </div>
      <div className="flex gap-4 p-5 lg:px-20">
        <FilterContainer />
        <div className="rounded-4xl flex flex-1 flex-col gap-4  ">
          <div className=" grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-3  2xl:grid-cols-4">
            {productsList.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ShopPage;
