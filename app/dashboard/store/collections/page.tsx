import { CustomInput, SearchField } from "@/components";
import CustomTable from "@/components/CustomTable";
import ImageInput from "@/components/ImageInput";
import Modal from "@/components/Modal";
import {
  addNewCollection,
  fetchCollections,
  removeCollection,
  updateCollection,
} from "@/lib/actions/store.actions";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { collectionId, addCollection, removeCollectionId } = searchParams as {
    [key: string]: string;
  };

  const collections = await fetchCollections();

  let collection;
  if (collectionId) {
    collection = collections.find((item) => item._id === collectionId);
  }
  if (removeCollectionId) {
    collection = collections.find((item) => item._id === removeCollectionId);
  }
  return (
    <Suspense>
      <div className="flex items-center justify-center gap-3 px-5 md:gap-5 lg:px-20">
        <h1 className=" mr-auto hidden text-3xl font-bold md:block">
          Collections
        </h1>
      </div>
      <Modal isOpen={!!collectionId}>
        <div className="flex flex-col gap-5 p-5 lg:p-20">
          <form action={updateCollection} className="flex flex-col gap-2">
            <input
              type="text"
              name="id"
              value={collection?._id}
              readOnly
              hidden
            />
            <ImageInput
              label="image"
              placeholder="Enter image"
              defaultValue={collection?.image}
              type="text"
              name="image"
            />
            <CustomInput
              placeholder="Enter name"
              label="name"
              defaultValue={collection?.name}
              type="text"
              name="name"
            />
            <CustomInput
              placeholder="Enter url"
              label="url"
              defaultValue={collection?.url}
              type="string"
              name="url"
            />
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
            >
              Update
            </button>
            <Link
              replace
              href={"/dashboard/store/collections"}
              className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
            >
              close
            </Link>
          </form>
        </div>
      </Modal>
      <Modal isOpen={!!addCollection}>
        <div className="flex flex-col gap-5 p-5 lg:p-20">
          <form action={addNewCollection} className="flex flex-col gap-2">
            <ImageInput
              label="image"
              placeholder="Enter image"
              type="text"
              name="image"
            />
            <CustomInput
              placeholder="Enter name"
              label="name"
              type="text"
              name="name"
            />
            <CustomInput
              placeholder="Enter url"
              label="url"
              type="text"
              defaultValue="/shop"
              name="url"
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
            href={"/dashboard/store/collections"}
            className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
          >
            close
          </Link>
        </div>
      </Modal>
      <Modal isOpen={!!removeCollectionId}>
        <div className="flex flex-col gap-5 p-5 lg:p-20">
          <form action={removeCollection} className="flex flex-col gap-2">
            <Image
              src={collection?.image || ""}
              width={100}
              height={100}
              className="aspect-[9/16]"
              alt="image"
            />
            <input
              type="text"
              name="id"
              value={collection?._id}
              readOnly
              hidden
            />
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
            >
              remove
            </button>
          </form>
          <Link
            replace
            href={"/dashboard/store/collections"}
            className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
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
              href="/dashboard/store/collections?addCollection=true"
              className="mt-2 flex h-12 w-full items-center justify-center overflow-hidden rounded-2xl bg-green-900 uppercase  text-white hover:bg-green-950"
            >
              Add Collection
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <CustomTable
              data={collections}
              header={["image", "name", "url"]}
              ActionComponent={(item) => (
                <div className="flex gap-2">
                  <Link
                    replace
                    href={
                      "/dashboard/store/collections?collectionId=" + item._id
                    }
                    className=" text-blue-500 hover:underline dark:text-blue-400 dark:hover:underline "
                  >
                    edit
                  </Link>
                  <Link
                    replace
                    href={
                      "/dashboard/store/collections?removeCollectionId=" +
                      item._id
                    }
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
