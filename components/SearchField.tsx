import Image from "next/image";

const SearchField = () => {
  return (
    <div className="relative w-full max-w-xl flex-grow-0">
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search"
        className="h-14 w-full rounded-3xl  border border-black bg-transparent p-2 px-4  pe-10 text-base outline-none focus:border-primary_color focus:ring-blue-500 dark:border-white  dark:text-white dark:placeholder-gray-400 dark:focus:border-gray-200 dark:focus:ring-gray-200"
      />
      <div className="absolute right-0 top-0 flex h-full w-14 items-center justify-center">
        <Image src="/icons/search.svg" alt="search" width={24} height={24} />
      </div>
    </div>
  );
};

export default SearchField;