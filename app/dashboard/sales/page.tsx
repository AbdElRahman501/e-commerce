import { CustomInput } from "@/components";
import CustomTable from "@/components/CustomTable";
import ImageInput from "@/components/ImageInput";
import Modal from "@/components/Modal";
import {
  addNewOffer,
  fetchOffers,
  removeOffer,
  updateOffer,
} from "@/lib/actions/offer.actions";
import {
  addNewPromoCode,
  fetchPromoCodes,
  removePromoCode,
  updatePromoCode,
} from "@/lib/actions/promo-code.actions";

import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function SalesPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const {
    offerId,
    addOffer,
    removeOfferId,
    addPromoCode,
    promoCodeId,
    removePromoCodeId,
  } = searchParams as {
    [key: string]: string;
  };
  const pathName = "/dashboard/sales";
  const offers = await fetchOffers();
  const promoCodes = await fetchPromoCodes();
  console.log("🚀 ~ promoCodes:", promoCodes);

  let offer;
  if (offerId) {
    offer = offers.find((item) => item._id === offerId);
  }
  if (removeOfferId) {
    offer = offers.find((item) => item._id === removeOfferId);
  }
  let promoCode;
  if (promoCodeId) {
    promoCode = promoCodes.find((item) => item._id === promoCodeId);
  }
  if (removePromoCodeId) {
    promoCode = promoCodes.find((item) => item._id === removePromoCodeId);
  }

  return (
    <Suspense>
      <Modal isOpen={!!offerId}>
        <div className="flex flex-col gap-5 p-5 lg:p-20">
          <form action={updateOffer} className="flex flex-col gap-2">
            <input type="text" name="id" value={offer?._id} readOnly hidden />
            <ImageInput
              label="image"
              placeholder="Enter image"
              defaultValue={offer?.image}
              type="text"
              name="image"
            />
            <CustomInput
              placeholder="Enter title"
              defaultValue={offer?.title}
              label="title"
              type="text"
              name="title"
            />
            <CustomInput
              placeholder="Enter description"
              defaultValue={offer?.description}
              label="description"
              type="text"
              name="description"
            />
            <CustomInput
              placeholder="Enter url"
              defaultValue={offer?.url}
              label="url"
              type="text"
              name="url"
            />
            <CustomInput
              placeholder="Enter category"
              defaultValue={offer?.category}
              label="category"
              type="text"
              name="category"
            />
            <CustomInput
              placeholder="Enter sale"
              defaultValue={offer?.sale}
              label="sale"
              type="number"
              name="sale"
            />
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
            >
              Update
            </button>
            <Link
              replace
              href={pathName}
              className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
            >
              close
            </Link>
          </form>
        </div>
      </Modal>
      <Modal isOpen={!!addOffer}>
        <div className="flex flex-col gap-5 p-5 lg:p-20">
          <form action={addNewOffer} className="flex flex-col gap-2">
            <ImageInput
              label="image"
              placeholder="Enter image"
              type="text"
              name="image"
            />
            <CustomInput
              placeholder="Enter title"
              label="title"
              type="text"
              name="title"
            />
            <CustomInput
              placeholder="Enter description"
              label="description"
              type="text"
              name="description"
            />
            <CustomInput
              placeholder="Enter url"
              label="url"
              type="text"
              name="url"
            />
            <CustomInput
              placeholder="Enter category"
              label="category"
              type="text"
              name="category"
            />
            <CustomInput
              placeholder="Enter sale"
              label="sale"
              type="number"
              name="sale"
            />
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
            >
              create
            </button>
          </form>
          <Link
            replace
            href={pathName}
            className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
          >
            close
          </Link>
        </div>
      </Modal>
      <Modal isOpen={!!removeOfferId}>
        <div className="flex flex-col gap-5 p-5 lg:p-20">
          <form action={removeOffer} className="flex flex-col gap-2">
            <Image
              src={offer?.image || ""}
              width={100}
              height={100}
              className="aspect-[9/16]"
              alt="image"
            />
            <input type="text" name="id" value={offer?._id} readOnly hidden />
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
            >
              remove
            </button>
          </form>
          <Link
            replace
            href={pathName}
            className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
          >
            close
          </Link>
        </div>
      </Modal>

      <Modal isOpen={!!promoCodeId}>
        <div className="flex flex-col gap-5 p-5 lg:p-20">
          <form action={updatePromoCode} className="flex flex-col gap-2">
            <input
              type="text"
              name="id"
              value={promoCode?._id}
              readOnly
              hidden
            />
            <CustomInput
              placeholder="Enter code"
              defaultValue={promoCode?.code}
              label="code"
              type="text"
              name="code"
            />
            <CustomInput
              placeholder="Enter discount"
              defaultValue={promoCode?.discount}
              label="discount"
              type="number"
              name="discount"
            />
            <CustomInput
              placeholder="Enter limit"
              defaultValue={promoCode?.limit}
              label="limit"
              type="number"
              name="limit"
            />
            <CustomInput
              placeholder="Enter maxDiscount"
              defaultValue={promoCode?.maxDiscount}
              label="maxDiscount"
              type="number"
              name="maxDiscount"
            />
            <CustomInput
              placeholder="Enter active"
              defaultValue={promoCode?.active}
              label="active"
              type="checkbox"
              name="active"
            />
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
            >
              Update
            </button>
            <Link
              replace
              href={pathName}
              className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
            >
              close
            </Link>
          </form>
        </div>
      </Modal>
      <Modal isOpen={!!addPromoCode}>
        <div className="flex flex-col gap-5 p-5 lg:p-20">
          <form action={addNewPromoCode} className="flex flex-col gap-2">
            <CustomInput
              placeholder="Enter code"
              label="code"
              type="text"
              name="code"
            />
            <CustomInput
              placeholder="Enter discount"
              label="discount"
              type="number"
              name="discount"
            />
            <CustomInput
              placeholder="Enter limit"
              label="limit"
              type="number"
              name="limit"
            />
            <CustomInput
              placeholder="Enter maxDiscount"
              label="maxDiscount"
              type="number"
              name="maxDiscount"
            />
            <CustomInput
              placeholder="Enter active"
              label="active"
              type="checkbox"
              name="active"
            />
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
            >
              create
            </button>
          </form>
          <Link
            replace
            href={pathName}
            className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
          >
            close
          </Link>
        </div>
      </Modal>
      <Modal isOpen={!!removePromoCodeId}>
        <div className="flex flex-col gap-5 p-5 lg:p-20">
          <form action={removePromoCode} className="flex flex-col gap-2">
            <p>Are you sure you want to remove this promo code?</p>
            <input type="text" name="id" value={offer?._id} readOnly hidden />
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
            >
              remove
            </button>
          </form>
          <Link
            replace
            href={pathName}
            className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
          >
            close
          </Link>
        </div>
      </Modal>

      <Suspense>
        <div className="flex flex-col gap-5 p-5 lg:p-20">
          <p>
            you can add title of FREE_SHIPPING to get free shipping and add the
            max value of FREE_SHIPPING in the description
          </p>
          <div className="flex gap-2">
            <Link
              replace
              href={`${pathName}?addOffer=true`}
              className="mt-2 flex h-12 w-full items-center justify-center overflow-hidden rounded-2xl bg-green-900 uppercase  text-white hover:bg-green-950"
            >
              Add Offer
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <CustomTable
              data={offers}
              header={["image", "title", "sale", "url", "category"]}
              ActionComponent={(item) => (
                <div className="flex gap-2">
                  <Link
                    replace
                    href={pathName + "?offerId=" + item._id}
                    className=" text-blue-500 hover:underline dark:text-blue-400 dark:hover:underline "
                  >
                    edit
                  </Link>
                  <Link
                    replace
                    href={pathName + "?removeOfferId=" + item._id}
                    className=" text-red-500 hover:underline dark:hover:underline "
                  >
                    remove
                  </Link>
                </div>
              )}
            />
          </div>
          <div className="flex gap-2">
            <Link
              replace
              href={`${pathName}?addPromoCode=true`}
              className="mt-2 flex h-12 w-full items-center justify-center overflow-hidden rounded-2xl bg-green-900 uppercase  text-white hover:bg-green-950"
            >
              Add PromoCode
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <CustomTable
              data={promoCodes.map((item) => ({
                ...item,
                status: item.active
                  ? { name: "active", color: "green" }
                  : { name: "inactive", color: "red" },
              }))}
              header={["code", "discount", "limit", "maxDiscount", "status"]}
              ActionComponent={(item) => (
                <div className="flex gap-2">
                  <Link
                    replace
                    href={pathName + "?promoCodeId=" + item._id}
                    className=" text-blue-500 hover:underline dark:text-blue-400 dark:hover:underline "
                  >
                    edit
                  </Link>
                  <Link
                    replace
                    href={pathName + "?removePromoCodeId=" + item._id}
                    className=" text-red-500 hover:underline dark:hover:underline "
                  >
                    remove
                  </Link>
                </div>
              )}
            />
          </div>
        </div>
      </Suspense>
    </Suspense>
  );
}
