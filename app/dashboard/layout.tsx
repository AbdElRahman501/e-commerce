import React, { Suspense } from "react";
import DashSideBar from "@/components/DashSideBar";
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
          <div className="w-3/4 flex-1 py-5">{children}</div>
        </div>
      </Suspense>
    </>
  );
}
