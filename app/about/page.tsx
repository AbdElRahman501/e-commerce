import { FAQSection, Footer } from "@/components";
import { Suspense } from "react";

const page = () => {
  return (
    <section>
      <div className="mx-auto flex max-w-4xl flex-col gap-4 px-5 py-5 text-center lg:px-20">
        <h1 className="text-4xl font-bold">
          Welcome to <strong>EH!</strong>
        </h1>
        <p>
          At <strong>EH!</strong>, every t-shirt is a celebration of your
          one-of-a-kind spirit and style. We’re delighted to have you here as
          part of our vibrant community of self-expression!
        </p>

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

        <section>
          <h2 className="mb-2 text-2xl font-semibold">
            Your Personalized Style
          </h2>
          <p>
            What sets <strong>EH!</strong> apart is our dedication to creating
            t-shirts that feel tailor-made for each individual. Our designs are
            carefully crafted with quirky illustrations, clever slogans, and
            eye-catching graphics that capture the essence of different
            personalities. When you wear an <strong>EH!</strong> t-shirt, you’re
            not just wearing clothing – you’re wearing your personality on your
            sleeve!
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold">Join Our Community</h2>
          <p>
            <strong>EH!</strong> isn’t just a clothing brand – it’s a warm and
            welcoming community of like-minded individuals who celebrate
            individuality, creativity, and self-expression. We’re all about
            spreading positivity and lifting each other up. So come on in, share
            your stories, and connect with fellow <strong>EH!</strong>{" "}
            enthusiasts who share your passion for fun and fabulous fashion.
          </p>
        </section>

        {/* Include additional sections based on the provided information (Goals and Objectives, Achievements, Client Testimonials, etc.) */}

        {/* Example: */}
        {/* <section>
          <h2 className="mb-2 text-2xl font-semibold">Find Your Perfect Fit</h2>
          <p>
            We believe that fashion should be inclusive and accessible to all.
            That’s why we offer a wide range of sizes and styles to ensure that
            everyone can find their perfect fit and feel fabulous in their <strong>EH!</strong>
            t-shirt. Because when you feel comfortable and confident in what you
            wear, it shows!
          </p>
        </section> */}

        <section>
          <h2 className="mb-2 text-2xl font-semibold">
            Spread the <strong>EH!</strong> Vibe
          </h2>
          <p>
            We believe that fashion has the power to uplift spirits and create
            connections. That’s why we encourage our community to share their
            <strong>EH!</strong> moments! Whether it’s a snapshot of you rocking
            an <strong>EH!</strong> tee on a mountaintop, at a cozy café, or
            during a spontaneous dance-off, tag us on social media using
            #EHVibe. Let’s celebrate life, one t-shirt at a time!
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold">Design Collaborations</h2>
          <p>
            We believe that creativity knows no bounds. That’s why we invite our
            <strong>EH!</strong> family to contribute their design ideas! If
            you’ve got a brilliant concept, a quirky doodle, or a slogan that
            makes you smile, share it with us. Who knows? Your design could
            become the next <strong>EH!</strong> sensation! Reach out to our
            design team, and let’s create magic together.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold">
            <strong>EH!</strong> Insider Club
          </h2>
          <p>
            Join our <strong>EH!</strong> Insider Club for exclusive perks! As a
            member, you’ll get early access to new collections, limited-edition
            designs, and behind-the-scenes glimpses. Plus, you’ll be the first
            to know about <strong>EH!</strong> events, giveaways, and surprises.
            It’s like having a secret handshake with fashion – only cooler!{" "}
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-2xl font-semibold">Let’s Connect</h2>
          <p>
            Have questions, feedback, or just want to say hello? Our{" "}
            <strong>EH!</strong> team is here for you! Reach out to us via
            email, social media, or carrier pigeon (just kidding, but we’d love
            that too!). We value your input and can’t wait to hear from you.
          </p>
        </section>

        {/* Add more sections as needed based on your specific content */}
      </div>
      <FAQSection />
      <Suspense>
        <Footer />
      </Suspense>
    </section>
  );
};

export default page;
