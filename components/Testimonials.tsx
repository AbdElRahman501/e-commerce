import { fetchReviews } from "@/lib/actions/store.actions";
import { SectionTitle } from ".";
import ReviewsCarousel from "./ReviewsCarousel";

const Testimonials = async () => {
  const reviews = await fetchReviews({ limit: 4 });

  if (!reviews || reviews.length === 0) {
    return null;
  }
  return (
    <section className="bg-primary_color py-5">
      <div className="rounded-4xl mx-auto flex max-w-8xl flex-col gap-4">
        <SectionTitle
          title="Reviews"
          className="px-5 text-white lg:px-20"
          theme="dark"
          url="/testimonials"
        />

        <ReviewsCarousel reviews={reviews} />
      </div>
    </section>
  );
};

export default Testimonials;
