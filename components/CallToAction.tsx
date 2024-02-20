import Image from "next/image";

const CallToAction = () => {
  return (
    <div className="h-60 w-full overflow-hidden  p-5">
      <Image
        src="/shop-image.png"
        alt="shop image"
        width={1920}
        height={800}
        className="rounded-4xl h-full w-full object-cover object-center"
      />
    </div>
  );
};

export default CallToAction;
