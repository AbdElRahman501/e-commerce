import Image from "next/image";

const FilterButton = () => {
  return (
    <div>
      <button className="flex h-14 w-14 flex-grow-0 items-center justify-center  rounded-2xl border bg-primary_color dark:bg-white md:hidden">
        <Image
          src="/icons/filter.svg"
          alt="search"
          width={30}
          height={30}
          className="invert dark:invert-0"
        />
      </button>
    </div>
  );
};

export default FilterButton;
