import CustomTable from "@/components/CustomTable";
import { fetchUsers } from "@/lib/actions/users.actions";
import Link from "next/link";
import React from "react";

const page = async () => {
  const subscribers = await fetchUsers();

  return (
    <div className="flex flex-col gap-2">
      <CustomTable
        data={subscribers}
        header={["email"]}
        CustomActions={[
          {
            key: "email",
            Action(item) {
              return (
                <Link
                  className="text-blue-700 hover:underline"
                  href={`mailto:${item.email}`}
                >
                  {item.email}
                </Link>
              );
            },
          },
        ]}
      />
    </div>
  );
};

export default page;
