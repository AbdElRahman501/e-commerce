import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ images, colors, id, title, price }: Product) => {
  return (
    <div className="Product flex-col gap-4">
      <Link href={{ pathname: "/product-detail", query: { id: id } }}>
        <div className="aspect-card relative overflow-hidden rounded-3xl">
          <Image
            src={images[colors[0]]}
            alt="jacket"
            fill
            className="duration-300 hover:scale-110"
          />
        </div>
      </Link>
      <div className="flex items-center justify-between p-1">
        <div className="flex items-center gap-1 ">
          {colors.map((item, index) => (
            <div
              key={index}
              className={`${index === 0 ? "scale-110  border-blue-900  dark:border-blue-400" : "border-transparent"} rounded-full border-2  p-[3px] duration-200 hover:scale-110`}
            >
              <span
                style={{ backgroundColor: item }}
                className="block h-5 w-5 rounded-full border"
              ></span>
            </div>
          ))}
        </div>
        <Image
          src="/icons/heart.svg"
          alt="heart icon"
          width={24}
          height={24}
          className="duration-200 hover:scale-110 dark:invert"
        />
      </div>
      <h6 className="w-full text-base ">{title}</h6>
      <h5 className="text-xl font-bold">{price} EGP</h5>
    </div>
  );
};

export default ProductCard;
