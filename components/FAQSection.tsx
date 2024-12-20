import Image from "next/image";
import FAQCard from "./FAQCard";
import { fetchStore } from "@/lib/actions/store.actions";

const FAQSection = async () => {
  const store = await fetchStore();
  const { faq } = store;
  if (!faq) return null;
  return (
    <section className="mx-auto max-w-8xl p-5 lg:p-20">
      <div className="flex gap-20">
        <div className="flex flex-col gap-4 md:w-1/2">
          <h1 className="text-2xl font-bold uppercase md:text-4xl ">FAQ</h1>
          {faq.questions.map((item, index) => (
            <FAQCard key={index} question={item.name}>
              <div dangerouslySetInnerHTML={{ __html: item.html }} />
            </FAQCard>
          ))}
        </div>
        <div className="hidden w-1/2 md:flex">
          <Image
            src={faq.image}
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
