import { faqSection } from "@/constants";
import Image from "next/image";
import FAQCard from "./FAQCard";

const FAQSection = () => {
  return (
    <section className="max-w-8xl mx-auto p-5 lg:p-20">
      <div className="flex gap-20">
        <div className="flex flex-col gap-4 md:w-1/2">
          <h1 className="text-2xl font-bold uppercase md:text-4xl ">FAQ</h1>
          {faqSection.map((item, index) => (
            <FAQCard key={index} {...item} />
          ))}
        </div>
        <div className="hidden  w-1/2 md:flex">
          <Image
            src="/panorama.png"
            alt="faq"
            width={500}
            height={500}
            className=" h-full w-full rounded-3xl object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
