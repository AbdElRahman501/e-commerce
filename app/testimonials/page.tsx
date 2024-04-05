import React, { Suspense } from "react";
import { Footer, TestimonialCard } from "@/components";
import { fetchReviews } from "@/lib/actions/store.actions";

const TestimonialsPage = async () => {
  const reviews = await fetchReviews({ limit: 4 });

  return (
    <>
      <div className="min-h-[88vh] p-5 lg:px-20">
        <h1 className="pb-5 text-xl font-semibold md:text-3xl">Testimonials</h1>
        <div className="grid grid-cols-1 gap-4  md:grid-cols-3 xl:grid-cols-3  2xl:grid-cols-4">
          {reviews.map((review, index) => (
            <TestimonialCard {...review} key={index} />
          ))}
        </div>
      </div>
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
};

export default TestimonialsPage;
