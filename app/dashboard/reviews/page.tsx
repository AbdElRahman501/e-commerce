import { CustomInput, SearchField } from "@/components";
import CustomTable from "@/components/CustomTable";
import Modal from "@/components/Modal";
import {
  addNewReview,
  fetchReviews,
  removeReview,
  updateReview,
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
  const { reviewId, addReview, removeReviewId } = searchParams as {
    [key: string]: string;
  };

  const reviews = await fetchReviews({ limit: 10000 });

  let review;
  if (reviewId) {
    review = reviews.find((item) => item._id === reviewId);
  }
  if (removeReviewId) {
    review = reviews.find((item) => item._id === removeReviewId);
  }
  return (
    <Suspense>
      <div className="flex items-center justify-center gap-3 px-5 md:gap-5 lg:px-20">
        <h1 className=" mr-auto hidden text-3xl font-bold md:block">Reviews</h1>
        <SearchField />
      </div>
      <Modal isOpen={!!reviewId}>
        <div className="flex flex-col gap-5 p-5 lg:p-20">
          <form action={updateReview} className="flex flex-col gap-2">
            <input type="text" name="id" value={review?._id} readOnly hidden />
            <CustomInput
              placeholder="Enter name"
              label="name"
              type="text"
              defaultValue={review?.name}
              required
              name="name"
            />
            <CustomInput
              placeholder="Enter title"
              label="title"
              type="text"
              defaultValue={review?.title}
              required
              name="title"
            />
            <CustomInput
              placeholder="Enter description"
              label="description"
              type="textarea"
              defaultValue={review?.description}
              required
              name="description"
            />
            <CustomInput
              placeholder="Enter images"
              label="images"
              type="textarea"
              defaultValue={review?.images}
              required
              name="images"
            />
            <CustomInput
              placeholder="Enter rating"
              label="rating"
              type="number"
              name="rating"
              required
              defaultValue={review?.rating}
              min={1}
              max={5}
            />
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
            >
              Update
            </button>
            <Link
              href={"/dashboard/reviews"}
              className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
            >
              close
            </Link>
          </form>
        </div>
      </Modal>
      <Modal isOpen={!!addReview}>
        <div className="flex flex-col gap-5 p-5 lg:p-20">
          <form action={addNewReview} className="flex flex-col gap-2">
            <CustomInput
              placeholder="Enter name"
              label="name"
              type="text"
              required
              name="name"
            />
            <CustomInput
              placeholder="Enter title"
              label="title"
              type="text"
              required
              name="title"
            />
            <CustomInput
              placeholder="Enter description"
              label="description"
              type="textarea"
              required
              name="description"
            />
            <CustomInput
              placeholder="Enter rating"
              label="rating"
              type="number"
              name="rating"
              required
              min={1}
              max={5}
            />
            <CustomInput
              placeholder="Enter images"
              label="images"
              type="textarea"
              defaultValue={review?.images}
              required
              name="images"
            />
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
            >
              create
            </button>
          </form>
          <Link
            href={"/dashboard/reviews"}
            className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
          >
            close
          </Link>
        </div>
      </Modal>
      <Modal isOpen={!!removeReviewId}>
        <div className="flex flex-col gap-5 p-5 lg:p-20">
          <form action={removeReview} className="flex flex-col gap-2">
            <input type="text" name="id" value={review?._id} readOnly hidden />
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
            >
              remove
            </button>
          </form>
          <Link
            href={"/dashboard/reviews"}
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
              href="/dashboard/reviews?addReview=true"
              className="mt-2 flex h-12 w-full items-center justify-center overflow-hidden rounded-2xl bg-green-900 uppercase  text-white hover:bg-green-950"
            >
              Add Review
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <CustomTable
              data={reviews}
              header={["name", "title", "rating"]}
              ActionComponent={(item) => (
                <div className="flex gap-2">
                  <Link
                    href={"/dashboard/reviews?reviewId=" + item._id}
                    className=" text-blue-500 hover:underline dark:text-blue-400 dark:hover:underline "
                  >
                    edit
                  </Link>
                  <Link
                    href={"/dashboard/reviews?removeReviewId=" + item._id}
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
