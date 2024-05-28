"use client";
import React from "react";
import Modal from "./Modal";
import Link from "next/link";
import {
  LogosFacebook,
  LogosLinkedinIcon,
  LogosPinterest,
  LogosWhatsappIcon,
  PrimeTwitter,
} from "./icons/socialmedia";
import { ProductOnSaleType } from "@/types";
import { IcRoundShare } from "./icons/Share_icon";
import { usePathname, useSearchParams } from "next/navigation";
import CheckMark from "./icons/CheckMark";
import Copy_icon from "./icons/Copy_icon";
import { getImageUrl, getSelectedOptionsFromURL } from "@/utils";

const ShareModal = ({
  variations,
  images,
  title,
}: {
  variations: ProductOnSaleType["variations"];
  images: ProductOnSaleType["images"];
  title: string;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedOptions = getSelectedOptionsFromURL(variations, searchParams);

  const imageUrl = getImageUrl(variations, selectedOptions) || images[0];

  const [copied, setCopied] = React.useState(false);
  const copyToClipboard = (url: string) => {
    navigator?.clipboard?.writeText(url);
    setCopied(true);
  };

  const [isOpen, setIsOpen] = React.useState(false);

  const url =
    process.env.NEXT_PUBLIC_VERCEL_URL +
    pathname +
    "?" +
    searchParams.toString();
  const message = encodeURIComponent(
    `Check out this awesome product from @eh.egyy: ${url}`,
  );
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <IcRoundShare className="w-6 text-gray-500 hover:text-black dark:hover:text-white" />
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-lg">Share this link via</h2>
        <div className="flex justify-center gap-3 p-2">
          <Link
            target="_blank"
            className="aspect-square rounded-full border border-gray-300 p-3 "
            href={`whatsapp://send?text=${message}`}
          >
            <LogosWhatsappIcon className=" w-6 duration-300 hover:scale-125" />{" "}
          </Link>
          <Link
            target="_blank"
            className="aspect-square rounded-full border border-gray-300 p-3 "
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&t=${encodeURIComponent("Check out this awesome product from @eh.egyy" + title)}`}
          >
            <LogosFacebook className=" w-6 duration-300 hover:scale-125" />{" "}
          </Link>
          <Link
            target="_blank"
            className="aspect-square rounded-full border border-gray-300 p-3 "
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
          >
            <PrimeTwitter className=" w-6 duration-300 hover:scale-125" />
          </Link>
          <Link
            target="_blank"
            className="aspect-square rounded-full border border-gray-300 p-3 "
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`}
          >
            <LogosLinkedinIcon className=" w-6 duration-300 hover:scale-125" />
          </Link>
          <Link
            target="_blank"
            className="aspect-square rounded-full border border-gray-300 p-3 "
            href={`http://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(title)}`}
          >
            <LogosPinterest className=" w-6 duration-300 hover:scale-125" />{" "}
          </Link>
        </div>
        <h2 className="text-lg">Or copy link</h2>
        <div className="flex items-center justify-between gap-1 break-all border p-2 font-bold">
          <p className="inline text-wrap">{url}</p>
        </div>
        <button
          className="my-2 w-full rounded-lg bg-black px-4 py-4 text-center text-white hover:bg-white hover:text-black dark:bg-white  dark:text-black dark:hover:bg-black dark:hover:text-white"
          onClick={() => copyToClipboard(url)}
          type="button"
        >
          <p className="inline px-2">Copy</p>
          {copied ? (
            <CheckMark className="inline fill-current" />
          ) : (
            <Copy_icon className="inline fill-current" />
          )}
        </button>
      </Modal>
    </>
  );
};

export default ShareModal;
