import { ArrowButton } from ".";

const Hero = () => {
  return (
    <section className="bg-primary_bg">
      <div className="flex flex-col-reverse gap-4 px-5 py-5 lg:max-h-[calc(100vh-4rem)] lg:flex-row lg:px-20 ">
        <div className="flex flex-col gap-4 md:flex-row lg:flex-col">
          <div className="rounded-4xl relative flex h-full w-full items-end justify-start overflow-hidden max-md:max-h-64 ">
            <img
              src="/women-collection.png"
              alt="women collection"
              className="h-full w-full object-cover object-center"
            />
            <ArrowButton
              href="/shop"
              className="absolute right-3 top-3 bg-white  text-3xl text-black  dark:text-black"
            />
          </div>
          <div className="rounded-4xl relative h-full w-full overflow-hidden max-md:max-h-64 ">
            <img
              src="/men-collection.png"
              className="h-full w-full object-cover object-center"
              alt="men collection"
            />
            <ArrowButton
              href="/shop"
              className="absolute right-3 top-3 bg-white  text-3xl text-black  dark:text-black"
            />
          </div>
          <div className="rounded-4xl relative  flex min-h-[120px] w-full items-end overflow-hidden bg-primary_color md:w-[70%] lg:h-[70%] lg:w-full">
            <h1 className="m-5 text-3xl text-white dark:text-white">
              sale 15%
            </h1>
            <ArrowButton
              href="/shop"
              className="absolute right-3 top-3 bg-white  text-3xl text-black  dark:text-black "
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="hidden md:inline-block">
            <div className="rounded-4xl relative h-full w-full overflow-hidden ">
              <img
                src="/new-collection.png"
                className="h-full w-full object-cover"
                alt="new collection"
              />
            </div>
          </div>
          <div className="flex flex-col-reverse gap-4 md:flex-col">
            <div>
              <div className="flex h-[60px] w-full items-center justify-between overflow-hidden rounded-full bg-primary_color  ">
                <h1 className=" px-5 text-white dark:text-white">Shop now</h1>
                <ArrowButton
                  href="/shop"
                  className="bg-white  text-3xl text-black  dark:text-black"
                />
              </div>
            </div>
            <div className="rounded-4xl h-full w-full overflow-hidden ">
              <img
                src="/panorama.png"
                className="h-full w-full object-cover"
                alt="new collection"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
