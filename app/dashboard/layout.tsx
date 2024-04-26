import DashSideBar from "@/components/DashSideBar";
import React, { Suspense } from "react";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense>
        <div className="flex">
          <Suspense>
            <DashSideBar />
          </Suspense>
          <div className="w-3/4 flex-1">{children}</div>
        </div>
      </Suspense>
    </>
  );
}
