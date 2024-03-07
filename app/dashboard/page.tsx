import { CustomTable, TotalCard } from "@/components";
import { dashboardCards, products } from "@/constants";
import React from "react";

const DashBoardPage = () => {
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
          />
        ))}
      </div>

      <CustomTable
        data={products}
        header={["title", "name", "price", "gender", "quantity"]}
      />
    </div>
  );
};

export default DashBoardPage;
