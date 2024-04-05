import Image from "next/image";
import Rating from "./Rating";
import { ReviewType } from "@/types";
import CustomImage from "./CustomImage";

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
      <div className="images-container gap-1 overflow-hidden">
        {images.length > 0 &&
          [...images, ...images].map((url, index) => (
            <div
              className={`area-${index + 1} relative aspect-[16/9] overflow-hidden rounded-lg`}
              key={index}
            >
              <CustomImage
                src={url}
                alt={name + "'s review image"}
                fill
                style={{ objectFit: "cover" }}
                sizes="100%"
              />
            </div>
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
