const LoadingDots = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <span
        className={` m-0 h-3 animate-bounce rounded-full p-0  leading-[0] [animation-delay:-0.3s]`}
      >
        .
      </span>
      <span
        className={` m-0 h-3 animate-bounce rounded-full p-0  leading-[0] [animation-delay:-0.15s]`}
      >
        .
      </span>
      <span className={` m-0 h-3 animate-bounce rounded-full p-0  leading-[0]`}>
        .
      </span>
    </div>
  );
};

export default LoadingDots;
