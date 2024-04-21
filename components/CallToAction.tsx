"use server";
import { fetchOffers } from "@/lib/actions/offer.actions";
import OffersCarousel from "./OffersCarousel";

const CallToAction = async () => {
  const offers = await fetchOffers();
  return <OffersCarousel offers={offers} />;
};

export default CallToAction;
