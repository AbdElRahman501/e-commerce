import React, { Suspense } from "react";
import { fetchCollections } from "@/lib/actions/store.actions";
import UpdateProducts from "@/components/product/UpdateProducts";
export default async function UpdatePage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { selectedIds } = searchParams as {
    [key: string]: string;
  };
  const collections = await fetchCollections();

  return (
    <div className="flex flex-col gap-3 ">
      <Suspense>
        <UpdateProducts
          selectedIds={selectedIds.trim().split(",")}
          collections={collections}
        />
      </Suspense>
    </div>
  );
}
