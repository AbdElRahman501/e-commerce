"use server";
import { fetchOffers } from "@/lib/actions/offer.actions";
import Image from "next/image";

const CallToAction = async () => {
  const offers = await fetchOffers();
  return (
    <div className="scroll-bar-hidden relative mb-5  flex h-60 w-full snap-x snap-mandatory overflow-scroll ">
      {offers.map((offer, index) => (
        <div
          key={index}
          className={`relative h-full min-w-[100vw] snap-center overflow-hidden bg-gradient-to-r from-slate-100 to-slate-200 `}
        >
          <Image
            src={offer.image}
            alt={offer.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="100%"
            className="cursor-pointer duration-700 hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
};

export default CallToAction;
