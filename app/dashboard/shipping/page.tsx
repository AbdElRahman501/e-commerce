import { CustomInput, SearchField } from "@/components";
import CustomTable from "@/components/CustomTable";
import DropDown_icon from "@/components/icons/DropDown_icon";
import Modal from "@/components/Modal";
import SubmitButton from "@/components/SubmitButton";

import {
  addNewCity,
  addNewGovernorate,
  fetchShipping,
  updateCity,
  updateGovernorate,
} from "@/lib/actions/shipping.actions";
import Link from "next/link";
import { Suspense } from "react";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const {
    q: searchValue,
    governorateId,
    cityId,
    addGovernorate,
    addCity,
  } = searchParams as {
    [key: string]: string;
  };

  const { governorate, cities } = await fetchShipping();

  let gov;
  if (governorateId) {
    gov = governorate.find((item) => item.id === governorateId);
  }
  let city;
  if (cityId) {
    city = cities.find((item) => item.id === cityId);
  }

  let maxId = 0;
  cities.forEach((city) => {
    const cityId = parseInt(city.id);
    if (cityId > maxId) {
      maxId = cityId;
    }
  });

  const pathname = "/dashboard/shipping";
  return (
    <Suspense>
      <div className=" flex items-center justify-center gap-3 px-5 md:gap-5 lg:px-20">
        <h1 className=" mr-auto hidden text-3xl font-bold md:block">
          governorate
        </h1>
        <SearchField />
      </div>
      <Modal onCloseBath={pathname} isOpen={!!gov}>
        <div className="flex flex-col gap-5 p-5 lg:p-20">
          <form action={updateGovernorate} className="flex flex-col gap-2">
            <input type="text" name="id" value={gov?.id} readOnly hidden />
            <CustomInput
              label="governorate_name_en"
              placeholder="Enter governorate_name_en"
              defaultValue={gov?.governorate_name_en}
              type="text"
              name="governorate_name_en"
            />
            <CustomInput
              placeholder="Enter shipping_price"
              label="shipping_price"
              defaultValue={gov?.shipping_price}
              type="number"
              name="shipping_price"
            />
            <SubmitButton className="rounded-lg bg-black px-4 py-2 text-center text-white hover:bg-white hover:text-black dark:bg-white  dark:text-black dark:hover:bg-black dark:hover:text-white">
              Update
            </SubmitButton>
          </form>
        </div>
      </Modal>
      <Modal onCloseBath={pathname} isOpen={!!city}>
        <div className="flex flex-col gap-5 p-5 lg:p-20">
          <form action={updateCity} className="flex flex-col gap-2">
            <input type="text" name="id" value={city?.id} readOnly hidden />
            <CustomInput
              label="city_name_en"
              placeholder="Enter city_name_en"
              defaultValue={city?.city_name_en}
              type="text"
              name="city_name_en"
            />
            <CustomInput
              placeholder="Enter shipping_price"
              label="shipping_price"
              defaultValue={city?.shipping_price}
              type="number"
              name="shipping_price"
            />
            <SubmitButton className="rounded-lg bg-black px-4 py-2 text-center text-white hover:bg-white hover:text-black dark:bg-white  dark:text-black dark:hover:bg-black dark:hover:text-white">
              Update
            </SubmitButton>
          </form>
          <Link
            replace
            href={pathname}
            className="rounded-lg border px-4 py-2 text-center "
          >
            close
          </Link>
        </div>
      </Modal>
      <Modal onCloseBath={pathname} isOpen={!!addGovernorate}>
        <div className="flex flex-col gap-5 p-5 lg:p-20">
          <form action={addNewGovernorate} className="flex flex-col gap-2">
            <CustomInput
              label="id"
              placeholder="Enter id"
              type="text"
              name="id"
            />
            <CustomInput
              label="governorate_name_en"
              placeholder="Enter governorate_name_en"
              type="text"
              name="governorate_name_en"
            />
            <CustomInput
              placeholder="Enter shipping_price"
              label="shipping_price"
              type="number"
              name="shipping_price"
            />
            <SubmitButton className="rounded-lg bg-black px-4 py-2 text-center text-white hover:bg-white hover:text-black dark:bg-white  dark:text-black dark:hover:bg-black dark:hover:text-white">
              craete
            </SubmitButton>
          </form>
          <Link
            replace
            href={pathname}
            className="rounded-lg border px-4 py-2 text-center "
          >
            close
          </Link>
        </div>
      </Modal>
      <Modal onCloseBath={pathname} isOpen={!!addCity}>
        <div className="flex flex-col gap-5 p-5 lg:p-20">
          <form action={addNewCity} className="flex flex-col gap-2">
            <CustomInput
              label="id"
              placeholder="Enter id"
              value={(maxId + 1).toString()}
              readOnly
              type="text"
              name="id"
            />
            <div className="relative flex w-full flex-col">
              <select
                name={"governorate_id"}
                id={"governorate_id"}
                defaultValue={""}
                required
                className=" peer h-14 w-full appearance-none rounded-lg border-[1px] border-gray-400 bg-transparent px-4 pt-3 text-base outline-none placeholder-shown:pt-0 invalid:border-pink-500 invalid:text-pink-600 focus:border-orange-500 focus:pt-3 focus:ring-blue-500 focus:invalid:border-pink-500  focus:invalid:ring-pink-500 enabled:cursor-pointer motion-reduce:transition-none  dark:border-gray-700 dark:text-white dark:placeholder-gray-400 dark:invalid:border-pink-500 dark:focus:ring-gray-200 "
              >
                <option value="" disabled className="text-gray-400">
                  {"Enter governorate_id"}
                </option>
                {governorate.map((gov) => (
                  <option
                    key={gov.id}
                    value={gov.id}
                    className="text-black dark:text-black"
                  >
                    {gov.governorate_name_en}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 transition-all duration-200 peer-enabled:peer-hover:text-gray-200">
                <DropDown_icon className="h-6 w-6 fill-current" />
              </div>
            </div>
            <CustomInput
              placeholder="Enter city_name_en"
              label="city_name_en"
              type="text"
              name="city_name_en"
            />
            <CustomInput
              placeholder="Enter shipping_price"
              label="shipping_price"
              type="number"
              name="shipping_price"
            />
            <SubmitButton className="rounded-lg bg-black px-4 py-2 text-center text-white hover:bg-white hover:text-black dark:bg-white  dark:text-black dark:hover:bg-black dark:hover:text-white">
              create
            </SubmitButton>
          </form>
          <Link
            replace
            href={pathname}
            className="rounded-lg border px-4 py-2 text-center "
          >
            close
          </Link>
        </div>
      </Modal>

      <Suspense>
        <div className="flex flex-col gap-5 p-5 lg:p-20">
          <div className="flex gap-2">
            <Link
              replace
              href={pathname + "?addGovernorate=true"}
              className="mt-2 flex h-12 w-full items-center justify-center overflow-hidden rounded-2xl bg-green-900 uppercase  text-white hover:bg-green-950"
            >
              Add Governorate
            </Link>
            <Link
              replace
              href={pathname + "?addCity=true"}
              className="mt-2 flex h-12 w-full items-center justify-center overflow-hidden rounded-2xl bg-green-900 uppercase  text-white hover:bg-green-950"
            >
              Add city
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <CustomTable
              data={governorate
                .filter((gov) =>
                  gov.governorate_name_en
                    .toLowerCase()
                    .startsWith(searchValue?.toLowerCase() || ""),
                )
                .sort((a: any, b: any) => a.id - b.id)}
              header={["id", "governorate_name_en", "shipping_price"]}
              ActionComponent={(item) => (
                <Link
                  replace
                  href={pathname + "?governorateId=" + item.id}
                  className=" text-blue-500 hover:underline dark:text-blue-400 dark:hover:underline "
                >
                  edit
                </Link>
              )}
            />
            <CustomTable
              data={cities
                .filter((city) =>
                  city.city_name_en
                    .toLowerCase()
                    .startsWith(searchValue?.toLowerCase() || ""),
                )
                .sort((a: any, b: any) => a.governorate_id - b.governorate_id)}
              header={["city_name_en", "governorate_id", "shipping_price"]}
              ActionComponent={(item) => (
                <Link
                  replace
                  href={pathname + "?cityId=" + item.id}
                  className=" text-blue-500 hover:underline dark:text-blue-400 dark:hover:underline "
                >
                  edit
                </Link>
              )}
            />
          </div>
        </div>
      </Suspense>
    </Suspense>
  );
}
