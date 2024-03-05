import Image from "next/image";

const FilterButton = ({
  setIsOpen,
  isOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const openFilter = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setTimeout(() => {
        window.scrollTo({ top: 220, behavior: "smooth" });
      }, 300);
      setIsOpen(true);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={openFilter}
        className="flex h-14 w-14 flex-grow-0 items-center justify-center  rounded-2xl border bg-primary_color dark:bg-white md:hidden"
      >
        <Image
          src={isOpen ? "/icons/sun.svg" : "/icons/filter.svg"}
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
