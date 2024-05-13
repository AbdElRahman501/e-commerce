"use client";
import React from "react";
import Modal from "./Modal";
import Link from "next/link";
import {
  LogosFacebook,
  LogosPinterest,
  LogosWhatsappIcon,
} from "./icons/socialmedia";
import { ProductOnSaleType } from "@/types";
import { IcRoundShare } from "./icons/Share_icon";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CheckMark from "./icons/CheckMark";
import Copy_icon from "./icons/Copy_icon";

const ShareModal = ({
  images,
  title,
}: {
  images: ProductOnSaleType["images"];
  title: string;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const color = searchParams.get("color")?.replace("HASH:", "#") || "";

  const [copied, setCopied] = React.useState(false);
  const copyToClipboard = (id: string) => {
    navigator.clipboard.writeText(id);
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
        <div className="text-center">
          <p className="p-5 pb-1 pt-5 text-lg">
            copy this link and share it with your friends.
          </p>
          <button onClick={() => copyToClipboard(url)} type="button">
            {copied ? (
              <CheckMark className="inline fill-current" />
            ) : (
              <Copy_icon className="inline fill-current" />
            )}
          </button>
          <div className="text-wrap break-all border p-2 font-bold">
            <p className="inline">{url}</p>
          </div>
        </div>
        <div className="flex justify-center gap-3 p-2">
          <Link target="_blank" href={`whatsapp://send?text=${message}`}>
            <LogosWhatsappIcon className="w-8" />{" "}
          </Link>
          <Link
            target="_blank"
            href={`https://www.facebook.com/sharer/sharer.php?u=${message}`}
          >
            <LogosFacebook className="w-8" />{" "}
          </Link>
          <Link
            target="_blank"
            href={`http://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(images[color]?.[0])}&description=${encodeURIComponent(title)}`}
          >
            <LogosPinterest className="w-8" />{" "}
          </Link>
        </div>
      </Modal>
    </>
  );
};

export default ShareModal;
