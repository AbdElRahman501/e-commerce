import Link from "next/link";
import React from "react";

const WhatsAppButton = () => {
  const phoneNumber = process.env.PHONE_NUMBER;
  if (!phoneNumber) return null;
  return (
    <div className="group fixed bottom-0 right-0 z-20 m-4">
      <Link
        target="_blank"
        href={`https://api.whatsapp.com/send?phone=${phoneNumber}&text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20your%20products.`}
        className="relative cursor-pointer"
      >
        <div>
          <div className="relative h-16 w-16 cursor-pointer rounded-full bg-green-600 shadow-md outline-none transition-all duration-300 ease-in-out hover:bg-green-600 hover:opacity-100 hover:shadow-lg">
            <span
              className="absolute inset-0 m-2 bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: "url(//i.imgur.com/cAS6qqn.png)" }}
            ></span>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute h-16 w-16 animate-ping rounded-full bg-green-600 opacity-60"></div>
        </div>
      </Link>
      <div className="absolute -left-32 top-1/2 -translate-y-1/2 transform rounded-full bg-green-700 px-2 py-1 text-sm font-medium text-white opacity-0 transition-all duration-300 ease-in-out group-hover:w-auto group-hover:px-2 group-hover:opacity-100">
        Chat with us
      </div>
    </div>
  );
};

export default WhatsAppButton;
