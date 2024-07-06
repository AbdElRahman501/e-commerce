import { FAQSection, Footer } from "@/components";
import { fetchStore } from "@/lib/actions/store.actions";
import { Suspense } from "react";

async function page() {
  const { about } = await fetchStore();
  if (!about) return null;
  return (
    <>
      <div className="mx-auto flex max-w-4xl flex-col gap-4 px-5 py-5 text-center lg:px-20">
        {about.map((item, index) => (
          <div id={item.name} key={index}>
            <div dangerouslySetInnerHTML={{ __html: item.html }} />
          </div>
        ))}

        <section>
          <h2 className="mb-2 text-2xl font-semibold">
            Embrace Your Uniqueness
          </h2>
          <p>
            At <strong>EH!</strong>, we believe in embracing what makes you,
            well, you! Our t-shirts are thoughtfully designed to reflect the
            full spectrum of personalities, interests, and passions out there.
            Whether you’re a laid-back adventurer, a witty intellect, a
            whimsical dreamer, or anything in between, we’ve got a design that’s
            just right for you.
          </p>
        </section>
      </div>
      <FAQSection />
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}

export default page;
