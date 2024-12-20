import CollectionCard from "@/components/CollectionCard";
import { fetchCollections } from "@/lib/actions/store.actions";
import React from "react";

const CollectionsPage = async () => {
  const collections = await fetchCollections();
  return (
    <div className="min-h-[88vh] p-5 lg:px-20">
      <h1 className="pb-5 text-center text-3xl font-extrabold">Collections</h1>

      <div className="grid grid-cols-2 gap-4  md:grid-cols-3 xl:grid-cols-3  2xl:grid-cols-4">
        {collections.map((collection, index) => (
          <CollectionCard
            key={collection.name}
            {...collection}
            className={index === 0 ? "col-span-2 md:row-span-2" : ""}
          />
        ))}
      </div>
    </div>
  );
};

export default CollectionsPage;
