import React, { Suspense } from "react";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense>
        <Suspense>
          <div>sidebar</div>
        </Suspense>
        {children}
      </Suspense>
    </>
  );
}
