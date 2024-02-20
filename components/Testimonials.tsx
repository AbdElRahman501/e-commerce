import { SectionTitle, TestimonialCard } from ".";

const Testimonials = () => {
  return (
    <section className="bg-primary_color p-5 lg:px-20">
      <div className="rounded-4xl flex flex-col gap-4">
        <SectionTitle
          title="Testimonials"
          className="text-white"
          theme="dark"
          url="/testimonials"
        />
        <div className="scroll-bar-hidden flex gap-4 overflow-x-scroll">
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
