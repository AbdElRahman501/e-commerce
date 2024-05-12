import { faqSection } from "@/constants";
import Image from "next/image";
import FAQCard from "./FAQCard";

const FAQSection = () => {
  return (
    <section className="mx-auto max-w-8xl p-5 lg:p-20">
      <div className="flex gap-20">
        <div className="flex flex-col gap-4 md:w-1/2">
          <h1 className="text-2xl font-bold uppercase md:text-4xl ">FAQ</h1>
          {faqSection.map((item, index) => (
            <FAQCard key={index} {...item} />
          ))}
          <FAQCard question="How do I contact customer support?">
            <p>
              For any questions or concerns, you can reach our customer support
              team by emailing{" "}
              <a
                className="underline hover:no-underline"
                href="mailto:support@eh-eg.store"
              >
                support@eh-eg.store
              </a>{" "}
              . We aim to respond to inquiries promptly.
            </p>
          </FAQCard>
        </div>
        <div className="hidden w-1/2 md:flex">
          <Image
            src="https://res.cloudinary.com/dls8drwle/image/upload/v1714359533/Givaco/v9gd9ebf9aydtoajzxwn.png"
            alt="faq"
            width={500}
            height={500}
            className="h-full w-full rounded-3xl object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
