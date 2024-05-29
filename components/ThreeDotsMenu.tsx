import React from "react";

interface ThreeDotsMenuProps {
  children: React.ReactNode;
  className?: string;
}

const ThreeDotsMenu: React.FC<ThreeDotsMenuProps> = ({
  children,
  className,
}) => {
  return (
    <div className={"group relative inline-block " + className}>
      <div className="flex h-5 w-5 cursor-pointer flex-col items-center justify-between">
        <span className="h-[3px] w-[3px] rounded-full bg-black"></span>
        <span className="h-[3px] w-[3px] rounded-full bg-black"></span>
        <span className="h-[3px] w-[3px] rounded-full bg-black"></span>
      </div>

      <div className="absolute right-5 top-5 z-30 mt-2 hidden w-48  rounded-md bg-white p-4 shadow-lg group-hover:block">
        {children}
      </div>
    </div>
  );
};

export default ThreeDotsMenu;
