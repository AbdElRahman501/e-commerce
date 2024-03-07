import React from "react";

const CustomTable = ({ data, header }: { data: any; header: string[] }) => {
  return (
    <div className="scroll-bar-hidden overflow-x-scroll rounded-3xl border border-blue-300 bg-white p-5 shadow-md  ">
      <table>
        <thead>
          <tr>
            {header.map((item, index) => (
              <th
                key={index}
                className={index === header.length - 1 ? "" : "pr-8"}
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, index: number) => (
            <tr key={index} className="rounded-3xl border-b-2 ">
              {header.map((header, index) => (
                <td key={index} className="p-2">
                  {item[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
