import LogoIcon from "@/components/icons/LogoIcon";
import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = process.env.SITE_NAME;
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  // Font

  return new ImageResponse(
    (
      <div tw="flex h-full w-full flex-col items-center justify-center bg-[#333742]">
        <div tw="flex flex-none items-center justify-center">
          <LogoIcon />
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
