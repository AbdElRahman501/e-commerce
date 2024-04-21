import React, { Suspense } from "react";
import { Footer } from "@/components";
import { notFound } from "next/navigation";
import { fetchPromoCodeById } from "@/lib/actions/promo-code.actions";
import { fetchSubscriber } from "@/lib/actions/users.actions";
import LogoIcon from "@/components/icons/LogoIcon";
import Image from "next/image";
import Link from "next/link";
import {
  FaceBookIcon,
  InstagramIcon,
  ThreadsIcon,
} from "@/components/icons/socialmedia";

export default async function SubscriberWelcome({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const [subscribedId, promoCodeId] = params.id.split("-");

  const promoCode = await fetchPromoCodeById(promoCodeId);
  const subscribed = await fetchSubscriber(subscribedId);

  if (!promoCode?._id || !subscribed?._id) {
    return notFound();
  }

  return (
    <>
      <Suspense>
        <div className="gap-5 p-5 lg:p-20">
          <div className="w-full text-center text-xs">
            <p className="inline">{`Can't see this email? `}</p>
            <a href=" /subscriber/" className="inline text-blue-600 underline">
              View in Your Browser
            </a>
          </div>
          <div className="my-2 flex w-full justify-center">
            <LogoIcon className="w-32 fill-black dark:fill-white" />
          </div>
          <div className="flex w-full justify-center">
            <div className="aspect-card relative h-full w-full max-w-md">
              <Image
                src="https://res.cloudinary.com/dls8drwle/image/upload/v1713182484/Givaco/kc0ndsofzbieczvot7je.png"
                fill
                sizes="100%"
                style={{ objectFit: "contain" }}
                alt="Welcome Image"
                className="rounded-md"
              />
            </div>
          </div>
          <div>
            <h1 className="text-center text-6xl font-black uppercase">
              {`Here's 15% off`}
            </h1>
            <p className="text-center">
              enter the Code below to get 15% off your next purchase
            </p>
            <p className="my-2 border-2 px-4 py-2 text-center text-3xl font-bold text-gray-600 dark:text-gray-300">
              {promoCode?.code}
            </p>
          </div>

          <Link href="/shop" className="w-full">
            <div className="group mx-auto mt-2 flex h-14 w-full max-w-md items-center justify-center bg-black px-5 uppercase  text-white duration-300 hover:bg-white hover:text-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white ">
              <p className="duration-500 group-hover:scale-110">Shop Now</p>
            </div>
          </Link>
          <div className="my-4 flex w-full justify-center">
            <div className="aspect-card relative h-full w-full max-w-md">
              <Image
                src="https://res.cloudinary.com/dls8drwle/image/upload/v1713182836/Givaco/bbubdzx0abz9g0gopajc.png"
                fill
                sizes="100%"
                style={{ objectFit: "contain" }}
                alt="Welcome Image"
                className="rounded-md"
              />
            </div>
          </div>
          <Link href="/shop" className="w-full">
            <div className="group mx-auto mt-2 flex h-14 w-full max-w-md items-center justify-center bg-black px-5 uppercase  text-white duration-300 hover:bg-white hover:text-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white ">
              <p className="duration-500 group-hover:scale-110">Shop Now</p>
            </div>
          </Link>

          <div className="w-full py-5 text-center ">
            <div className="mb-5 mt-auto flex w-full justify-center gap-2">
              <Link href="https://www.instagram.com/eh.egyy/" target="_blank">
                <InstagramIcon className="h-7 w-7 fill-black dark:fill-white" />
              </Link>
              <Link
                href="https://www.facebook.com/profile.php?id=100084787940589"
                target="_blank"
              >
                <FaceBookIcon className="h-7 w-7 fill-black dark:fill-white" />
              </Link>
              <Link href="https://www.threads.net/@eh.egyy" target="_blank">
                <ThreadsIcon className="h-7 w-7 fill-black dark:fill-white" />
              </Link>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}
