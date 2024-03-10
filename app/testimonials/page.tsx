import React from "react";
import { TestimonialCard } from "@/components";

const TestimonialsPage = () => {
  return (
    <div className="min-h-[88vh] p-5 lg:px-20">
      <h1 className="pb-5 text-xl font-semibold md:text-3xl">Testimonials</h1>
      <div className="grid grid-cols-1 gap-4  md:grid-cols-3 xl:grid-cols-3  2xl:grid-cols-4">
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
      </div>
    </div>
  );
};

export default TestimonialsPage;
