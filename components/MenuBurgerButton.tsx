import Image from "next/image";

const MenuBurgerButton = () => {
  return (
    <button className="pe-8 md:hidden">
      <Image
        className="invert duration-300  hover:scale-110 dark:invert md:invert-0"
        src={"/icons/menu-burger.svg"}
        alt="menu"
        width={30}
        height={30}
      />
    </button>
  );
};

export default MenuBurgerButton;
