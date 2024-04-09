import Image from "next/image";

const CallToAction = () => {
  return (
    <div className="mb-5 h-60 w-full overflow-hidden">
      <Image
        src="/shop-image.png"
        alt="shop image"
        width={1920}
        height={800}
        className="h-full w-full object-cover object-center"
      />
    </div>
  );
};

export default CallToAction;
