import Image from "next/image";
import Rating from "./Rating";
import { ReviewType } from "@/types";

const TestimonialCard = ({
  name,
  title,
  description,
  rating,
  images,
}: ReviewType) => {
  return (
    <div className=" rounded-4xl flex w-full flex-col justify-center gap-1 bg-white p-6 py-6 text-center shadow-lg ">
      <h2 className="text-base font-bold text-primary_color">{name}</h2>
      <Rating rating={rating} />
      <div className="flex justify-center gap-4">
        {images.length > 0 &&
          images.map((url, index) => (
            <Image
              src={url}
              alt={name + "'s review image"}
              className="rounded-lg"
              width={150}
              height={150}
              key={index}
            />
          ))}
      </div>
      <h6 className="w-full text-sm text-gray-500 ">
        <strong>{title}</strong>
        {description}
      </h6>
    </div>
  );
};

export default TestimonialCard;
