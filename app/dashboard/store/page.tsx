import { CustomInput, SearchField } from "@/components";
import CustomTable from "@/components/CustomTable";
import ImageInput from "@/components/ImageInput";
import Modal from "@/components/Modal";
import { fetchOffers } from "@/lib/actions/offer.actions";

import {
  addNewStory,
  fetchAllStories,
  removeStory,
  updateStory,
} from "@/lib/actions/store.actions";
import { checkDateStatus } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { stroyId, addStory, removeStroyId } = searchParams as {
    [key: string]: string;
  };

  const stories = await fetchAllStories();
  const offers = await fetchOffers();

  let story;
  if (stroyId) {
    story = stories.find((item) => item._id === stroyId);
  }
  if (removeStroyId) {
    story = stories.find((item) => item._id === removeStroyId);
  }
  return (
    <Suspense>
      <div className="flex items-center justify-center gap-3 px-5 md:gap-5 lg:px-20">
        <h1 className=" mr-auto hidden text-3xl font-bold md:block">Stories</h1>
        <SearchField />
      </div>
      <Modal isOpen={!!stroyId}>
        <div className="flex flex-col gap-5 p-5 lg:p-20">
          <form action={updateStory} className="flex flex-col gap-2">
            <input type="text" name="id" value={story?._id} readOnly hidden />
            <ImageInput
              label="image"
              placeholder="Enter image"
              defaultValue={story?.image}
              type="text"
              name="image"
            />
            <CustomInput
              placeholder="Enter start"
              label="start"
              defaultValue={story?.start}
              type="date"
              name="start"
            />
            <CustomInput
              placeholder="Enter end"
              label="end"
              defaultValue={story?.end}
              type="date"
              name="end"
            />
            <CustomInput
              placeholder="Enter url"
              label="url"
              defaultValue={story?.url}
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
              href={"/dashboard/store"}
              className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
            >
              close
            </Link>
          </form>
        </div>
      </Modal>
      <Modal isOpen={!!addStory}>
        <div className="flex flex-col gap-5 p-5 lg:p-20">
          <form action={addNewStory} className="flex flex-col gap-2">
            <ImageInput
              label="image"
              placeholder="Enter image"
              type="text"
              name="image"
            />
            <CustomInput
              placeholder="Enter start"
              label="start"
              type="date"
              name="start"
            />
            <CustomInput
              placeholder="Enter end"
              label="end"
              type="date"
              name="end"
            />
            <CustomInput
              placeholder="Enter url"
              label="url"
              type="text"
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
            href={"/dashboard/store"}
            className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
          >
            close
          </Link>
        </div>
      </Modal>
      <Modal isOpen={!!removeStroyId}>
        <div className="flex flex-col gap-5 p-5 lg:p-20">
          <form action={removeStory} className="flex flex-col gap-2">
            <Image
              src={story?.image || ""}
              width={100}
              height={100}
              className="aspect-[9/16]"
              alt="image"
            />
            <input type="text" name="id" value={story?._id} readOnly hidden />
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
            >
              remove
            </button>
          </form>
          <Link
            replace
            href={"/dashboard/store"}
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
              href="/dashboard/store?addStory=true"
              className="mt-2 flex h-12 w-full items-center justify-center overflow-hidden rounded-2xl bg-green-900 uppercase  text-white hover:bg-green-950"
            >
              Add Story
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <CustomTable
              data={stories.map((item) => ({
                ...item,
                status: checkDateStatus(item.start, item.end),
              }))}
              header={["image", "start", "end", "status", "url"]}
              ActionComponent={(item) => (
                <div className="flex gap-2">
                  <Link
                    replace
                    href={"/dashboard/store?stroyId=" + item._id}
                    className=" text-blue-500 hover:underline dark:text-blue-400 dark:hover:underline "
                  >
                    edit
                  </Link>
                  <Link
                    replace
                    href={"/dashboard/store?removeStroyId=" + item._id}
                    className=" text-red-500 hover:underline dark:hover:underline "
                  >
                    remove
                  </Link>
                </div>
              )}
            />
            <CustomTable
              data={offers}
              header={["image", "title", "sale", "category"]}
              ActionComponent={(item) => (
                <div className="flex gap-2">
                  <Link
                    replace
                    href={"/dashboard/store?offerId=" + item._id}
                    className=" text-blue-500 hover:underline dark:text-blue-400 dark:hover:underline "
                  >
                    edit
                  </Link>
                  <Link
                    replace
                    href={"/dashboard/store?removeOfferId=" + item._id}
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
