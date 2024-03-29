import { SearchField } from "@/components";
import { Suspense } from "react";

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <div className="flex items-center justify-center gap-3 px-5 md:gap-5 lg:px-20">
        <h1 className=" mr-auto hidden text-3xl font-bold md:block">Orders</h1>
        <SearchField />
      </div>
      <Suspense>{children}</Suspense>
    </Suspense>
  );
}
