import { MdiLightEmail } from "@/components/icons/emailIcon";
import Modal from "@/components/Modal";
import SubmitButton from "@/components/SubmitButton";
import { subscribe } from "@/lib/actions/users.actions";
import { SubscriptionState } from "@/types";
import { cookies } from "next/headers";
import Image from "next/image";
import { updateState } from "./actions/sub.actions";
import { fetchOffers } from "@/lib/actions/offer.actions";

const SubscriptionModal = async () => {
  const state: SubscriptionState =
    (cookies().get("subscriptionState")?.value as SubscriptionState) ||
    "unsubscribed";
  const actionWithVariant = updateState.bind(null, "ignored");

  const offers = await fetchOffers();
  const offer = offers.find(
    (offer) =>
      offer.title === "subscription" && offer.category === "subscription",
  );

  if (!offer) return;

  return (
    <Modal
      formAction={actionWithVariant}
      isOpen={!(state === "subscribed") && !(state === "ignored")}
      delay={5000}
      className="relative z-10 max-h-[90vh] max-w-[95vw] overflow-y-auto rounded-lg bg-white shadow-lg dark:bg-[#0d1117] md:max-w-3xl xl:max-w-5xl"
    >
      <div className="flex flex-col items-center sm:flex-row">
        <Image
          src={offer.image}
          unoptimized={true}
          alt="modal"
          width={500}
          height={500}
          className="w-full sm:w-1/2"
        />
        <div className="w-full p-5 sm:w-1/2">
          <p className="p-2 text-center text-xl uppercase">
            <div dangerouslySetInnerHTML={{ __html: offer.description }} />
          </p>
          <form action={subscribe}>
            <div className=" flex w-full flex-col flex-wrap items-center justify-center gap-2 sm:flex-row  ">
              <div className="relative flex w-full min-w-64 flex-col sm:flex-row">
                <input
                  required
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}"
                  type={"email"}
                  name={"email"}
                  id={"email"}
                  placeholder=" "
                  className="peer h-14 w-full rounded-lg border-[1px] border-gray-300 bg-transparent px-4 pt-3 text-base outline-none  placeholder-shown:pt-0 focus:border-2  focus:border-black focus:pt-3 focus:text-black motion-reduce:transition-none dark:border-gray-700  dark:text-white dark:placeholder-gray-300 focus:dark:border-white  focus:dark:text-white  "
                />
                <label
                  className="peer-placeholder-shown:text-blue-gray-500  peer-disabled:peer-placeholder-shown:text-blue-gray-500 !overflow-block pointer-events-none absolute left-0 top-2 flex h-full w-full select-none truncate px-4 text-[11px] font-normal leading-tight text-gray-500 transition-all  peer-placeholder-shown:top-0 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75]  peer-focus:top-2 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-disabled:text-transparent dark:peer-focus:text-white "
                  htmlFor={"email"}
                >
                  {"Email"}
                </label>
              </div>

              <SubmitButton
                type="submit"
                className="group flex h-14 w-full items-center justify-center rounded-lg bg-black px-5 uppercase text-white duration-300 hover:bg-white hover:text-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white"
              >
                <MdiLightEmail className="mx-2 h-6 w-6 fill-current" />{" "}
                Subscribe
              </SubmitButton>
            </div>
          </form>
          <form action={actionWithVariant}>
            <button
              type="submit"
              className="w-full cursor-pointer pt-2 text-center uppercase hover:underline"
            >
              <p>
                I {`don't`} want {offer.sale}% off
              </p>
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default SubscriptionModal;
