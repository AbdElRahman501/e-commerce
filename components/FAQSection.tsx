import { faqSection } from "@/constants";
import Image from "next/image";

const FAQSection = () => {
  return (
    <section className="px-5 py-20 lg:px-20">
      <div className="flex gap-20">
        <div className="flex flex-col gap-4 md:w-1/2">
          <h1 className="mb-10 text-3xl font-bold">
            Frequently Asked Questions
          </h1>
          {faqSection.map((item, index) => (
            <div key={index} className="group">
              <div className="flex items-center justify-between gap-3 border-b-2 border-gray-300 pb-3 ">
                <h1 className="question text-xl font-medium duration-300 group-hover:scale-105">
                  {item.question}
                </h1>
                <h1 className="question text-4xl font-medium duration-300 group-hover:rotate-45 group-hover:scale-110  ">
                  +
                </h1>
              </div>
              <div className="answer max-h-0 overflow-hidden text-lg font-medium text-gray-500 transition-all duration-1000  group-hover:max-h-40">
                <p className="pb-3">{item.answer}</p>
              </div>
            </div>
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
