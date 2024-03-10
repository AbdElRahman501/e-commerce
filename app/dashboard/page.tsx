"use client";
import {
  CustomTable,
  LoadingLogo,
  SearchField,
  Sorting,
  TotalCard,
} from "@/components";
import ProductsAction from "@/components/ProductsAction";
import { dashboardCards, filterInitialData } from "@/constants";
import { Order, Product } from "@/types";
import { filterAndSortProducts, getOrders, getProducts } from "@/utils";
import React, { useEffect, useState } from "react";

const DashBoardPage = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");
  const [sorting, setSorting] = useState("");
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setFilteredProducts(
      filterAndSortProducts(products, filterInitialData, sorting, query),
    );
  }, [query, sorting, products]);

  useEffect(() => {
    getProducts(setProducts, setLoading);
    getOrders(setOrders, setLoading);
  }, []);

  return loading ? (
    <LoadingLogo />
  ) : (
    <div className=" flex flex-col gap-2 p-5 lg:p-20">
      <div className=" grid grid-cols-2 gap-2">
        {dashboardCards.map((card, index) => (
          <TotalCard
            key={index}
            image={card.image}
            title={card.title}
            number={card.number}
            description={card.description}
            url={card.url}
          />
        ))}
      </div>
      <div className="flex items-center justify-center gap-3 px-5 md:gap-5 lg:px-20">
        <h1 className=" mr-auto hidden text-3xl font-bold md:block">
          Products
        </h1>
        <div className="my-3 w-full">
          <SearchField
            setIsOpen={() => null}
            query={query}
            changeHandler={setQuery}
          />
        </div>
        <Sorting
          classNames=" ml-auto hidden h-14  min-w-max flex-nowrap items-center gap-3 rounded-3xl  border border-black px-2 dark:border-white md:flex"
          setSorting={setSorting}
          sorting={sorting}
        />
      </div>
      <CustomTable
        data={filteredProducts.map((item) => ({
          ...item,
          sizes: item.sizes.join(", "),
          image: item.images[item.colors[0]][0],
        }))}
        header={["image", "name", "colors", "sizes", "price"]}
        ActionComponent={ProductsAction}
      />
      <div>
        <button> addProduct </button>
      </div>
      <CustomTable
        data={orders.map((item) => ({
          ...item,
          id: "#" + item.id.slice(0, 5),
          ...item.personalInfo,
          products: products
            .filter((product) =>
              item.products.map((x) => x.productId).includes(product.id),
            )
            .map((y) => y.name)
            .join(", "),
        }))}
        header={["id", "firstName", "products", "state", "total"]}
        ActionComponent={ProductsAction}
      />
    </div>
  );
};

export default DashBoardPage;
