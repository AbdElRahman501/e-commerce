import { fetchReviews } from "@/lib/actions/store.actions";
import { SectionTitle, TestimonialCard } from ".";

const Testimonials = async () => {
  const reviews = await fetchReviews({ limit: 4 });
  return (
    <section className="bg-primary_color p-5 lg:px-20">
      <div className="rounded-4xl flex flex-col gap-4">
        <SectionTitle
          title="Testimonials"
          className="text-white"
          theme="dark"
          url="/testimonials"
        />
        <div className="scroll-bar-hidden overflow-x-scroll md:overflow-hidden ">
          <div className="grid-container grid w-full gap-4 md:grid-cols-4 lg:gap-8 ">
            {reviews.map((review, index) => (
              <TestimonialCard {...review} key={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
