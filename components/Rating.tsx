import Image from "next/image";

const Rating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex w-full justify-center gap-1">
      {[0, 0, 0, 0, 0].map((_, index) => (
        <Image
          key={index}
          src={
            index < rating ? "/icons/solid-star.svg" : "/icons/outline-star.svg"
          }
          alt="star"
          width={20}
          height={20}
        />
      ))}
    </div>
  );
};

export default Rating;
