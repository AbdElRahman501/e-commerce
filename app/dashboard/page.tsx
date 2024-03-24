import { OrdersTable, ProductTable, TotalCard } from "@/components";
import { dashboardCards } from "@/constants";
import React from "react";

const DashBoardPage = async () => {
  return (
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
      <ProductTable />
      <OrdersTable />
    </div>
  );
};

export default DashBoardPage;
