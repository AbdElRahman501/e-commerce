import Image from "next/image";

const ProductCard = () => {
  return (
    <div className="Product flex-col gap-4">
      <div className="aspect-card relative overflow-hidden rounded-3xl">
        <Image
          src="/jacket.png"
          alt="jacket"
          fill
          className=" duration-300 hover:scale-110"
        />
      </div>
      <div className="flex items-center justify-between p-1">
        <div className="flex gap-2 ">
          <div className="h-5 w-5 rounded-full bg-orange-700 duration-200 hover:scale-110"></div>
          <div className="h-5 w-5 rounded-full bg-red-800 duration-200 hover:scale-110"></div>
        </div>
        <Image
          src="/icons/heart.svg"
          alt="heart icon"
          width={24}
          height={24}
          className="duration-200 hover:scale-110 dark:invert"
        />
      </div>
      <h6 className="w-full text-base ">
        Lorem Ipsum is simply dummy text of the printing
      </h6>
      <h5 className="text-xl font-bold">700 EGP</h5>
    </div>
  );
};

export default ProductCard;
