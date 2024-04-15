import Image from "next/image";
import React from "react";

const CustomTable = ({
  data,
  header,
  ActionComponent,
}: {
  data: any;
  header: string[];
  ActionComponent?: (item: any) => JSX.Element;
}) => {
  if (!data || !data?.length) return null;

  const cell = (header: string, item: any) => {
    switch (header) {
      case "image":
        return (
          <Image
            src={item[header]}
            width={50}
            height={50}
            className="h-14 w-14 rounded-2xl"
            style={{ objectFit: "cover" }}
            alt="image"
          />
        );
      case "colors":
        const colors: string[] = item[header];
        return (
          <div className="flex items-center">
            {colors?.map((item, index) => (
              <div key={index} className="w-4 max-w-6 flex-1 rounded-full">
                <span
                  style={{ backgroundColor: item }}
                  className="block aspect-square w-full rounded-full border"
                ></span>
              </div>
            ))}
          </div>
        );
      case "status":
        const status: { name: string; color: string } = item[header];
        return <div style={{ color: status.color }}>{status.name}</div>;
      default:
        return item[header];
    }
  };

  return (
    <div className="scroll-bar-hidden overflow-x-scroll rounded-3xl border border-blue-300 bg-white p-5 shadow-md  dark:border-gray-700 dark:bg-primary_color  ">
      <table className="w-full">
        <thead className="border-b">
          <tr>
            {header.map((item, index) => (
              <th
                key={index}
                className={
                  "text-left " + (index === header.length - 1)
                    ? ActionComponent
                      ? "pr-8"
                      : ""
                    : "pr-8"
                }
              >
                {item}
              </th>
            ))}
            {ActionComponent && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, index: number) => (
            <tr key={index} className="rounded-3xl border-b-2 ">
              {header.map((header, index) => (
                <td key={index} className="p-2">
                  {cell(header, item)}
                </td>
              ))}
              <td className="p-2">
                {ActionComponent ? <ActionComponent {...item} /> : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
