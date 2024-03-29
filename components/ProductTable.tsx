"use server";
import { SectionTitle } from ".";
import CustomTable from "./CustomTable";
import { fetchFilteredProducts } from "@/lib";

export default async function ProductTable() {
  const { products } = await fetchFilteredProducts({
    limit: 5,
    sort: "Trending",
  });

  return (
    <div className="flex flex-col gap-2">
      <SectionTitle title={"Products"} url={"/dashboard/products"} />
      <CustomTable
        data={products.map((item) => ({
          ...item,
          image: item.images[item.colors[0]][0],
        }))}
        header={["views", "sales", "image", "price"]}
      />
    </div>
  );
}
