import { ProductsRow } from "@/components";
import Image from "next/image";

const page = () => {
  return (
    <main>
      <div className="h-60 w-full overflow-hidden  p-5">
        <Image
          src="/shop-image.png"
          alt="shop image"
          width={1920}
          height={800}
          className="rounded-4xl h-full w-full object-cover object-center"
        />
      </div>
      <div className="flex items-center justify-between gap-3 px-5">
        <div className="relative w-full flex-grow-0">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            className="h-11 w-full rounded-full border-2  p-2 pe-10 text-base outline-none focus:border-primary_color focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-gray-200 dark:focus:ring-gray-200"
          />
          <Image
            src="/icons/search.svg"
            alt="search"
            width={24}
            height={24}
            className="absolute right-3 top-2 opacity-50 "
          />
        </div>
        <div>
          <button className="flex h-11 w-11 flex-grow-0 items-center  justify-center rounded-xl border bg-primary_color">
            <Image
              src="/icons/filter.svg"
              alt="search"
              width={24}
              height={24}
              className="invert"
            />
          </button>
        </div>
      </div>

      <div></div>
    </main>
  );
};

export default page;
