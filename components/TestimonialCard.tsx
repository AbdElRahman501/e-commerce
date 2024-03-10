import Image from "next/image";
import Rating from "./Rating";

const TestimonialCard = () => {
  return (
    <div className=" rounded-4xl flex w-full flex-col justify-center gap-1 bg-white p-6 py-6 text-center shadow-lg ">
      <Image
        src="/user.svg"
        alt="user"
        width={40}
        height={40}
        className="mx-auto flex justify-center"
      />
      <h2 className="text-base font-bold text-primary_color">
        Abdelrahman Ahmed
      </h2>
      <Rating rating={4} />
      <h6 className="w-full text-sm text-gray-500 ">
        Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply
        dummy text of the printingLorem Ipsum is simply dummy text of the
        printingLorem Ipsum is simply dummy text of the printingLorem Ipsum is
        simply dummy text of the printing
      </h6>
    </div>
  );
};

export default TestimonialCard;
