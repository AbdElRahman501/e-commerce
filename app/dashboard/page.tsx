import OrdersTable from "@/components/OrdersTable";
import ProductTable from "@/components/ProductTable";
import TotalCard from "@/components/TotalCard";
import { dashboardCards } from "@/constants";
import React, { Suspense } from "react";

const DashBoardPage = async () => {
  return (
    <div className=" flex flex-col gap-5 p-5 lg:p-20">
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
      <Suspense>
        <ProductTable />
      </Suspense>
      <Suspense>
        <OrdersTable />
      </Suspense>
    </div>
  );
};

export default DashBoardPage;
