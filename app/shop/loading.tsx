export default function Loading() {
  return (
    <div className=" grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-3  2xl:grid-cols-4">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="flex animate-pulse flex-col gap-2 text-transparent"
        >
          <div className="aspect-card rounded-3xl bg-gray-300"></div>
          <div className="flex flex-col gap-1 p-4 text-center">
            <div className="w-full animate-pulse bg-gray-300 text-sm font-bold ">
              title Oversized T-shirt
            </div>
            <div className="relative flex items-center justify-center pt-2">
              <p className="animate-pulse bg-gray-300 text-sm  md:text-base  ">
                EGP 1000
              </p>
            </div>

            <div className="flex items-center justify-center gap-2">
              {[...Array(4)].map((item, index) => (
                <div
                  key={index}
                  className={` max-w-6 flex-1  rounded-full  p-[1px]`}
                >
                  <span className="block aspect-square w-full animate-pulse rounded-full border bg-gray-300"></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
