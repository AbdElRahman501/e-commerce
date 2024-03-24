import { FAQSection, Testimonials } from "@/components";

const page = () => {
  return (
    <section>
      <div className="flex flex-col gap-4 px-5 py-5 lg:px-20 ">
        <h1 className="text-3xl font-bold">About GIVACO</h1>

        <section>
          <h2 className="mb-2 text-xl font-semibold">Introduction</h2>
          <p>
            Welcome to GIVACO, your ultimate online destination for high-quality
            printed t-shirts with unique and creative designs. Express yourself,
            support a cause, or make a statement with our diverse collection
            tailored for every occasion and taste.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">History</h2>
          <p>
            Founded in 2024, GIVACO was established by a team of passionate
            t-shirt enthusiasts with a mission to share their love for t-shirts
            with the world.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">Team Members</h2>
          <p>
            Meet our dedicated team of t-shirt enthusiasts who are committed to
            providing you with the best online t-shirt shopping experience.
            {/* Include team members and their roles/bios here */}
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">Mission</h2>
          <p>
            GIVACO is mission is to provide customers with more than just a
            t-shirt. We aim to offer the best quality, unique designs, and an
            exceptional shopping experience.
          </p>
        </section>

        {/* Include additional sections based on the provided information (Goals and Objectives, Achievements, Client Testimonials, etc.) */}

        {/* Example: */}
        <section>
          <h2 className="mb-2 text-xl font-semibold">Goals and Objectives</h2>
          <p>Our current goals include {/* Add specific goals here */}.</p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">Community Involvement</h2>
          <p>
            GIVACO is committed to supporting local artists and designers,
            donating a percentage of profits to various charities and causes
            aligned with our values.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">Financial Projections</h2>
          <p>
            GIVACO is financial projections are based on market research,
            showing a high demand and potential for growth in the t-shirt
            business.
          </p>
        </section>

        {/* Add more sections as needed based on your specific content */}
      </div>
      <FAQSection />
    </section>
  );
};

export default page;
