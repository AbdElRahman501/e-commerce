const LoadingDots = ({ className }: { className?: string }) => {
  return (
    <div className="flex h-full w-full items-center justify-center gap-1">
      <div
        className={`h-1 w-1 animate-bounce rounded-full bg-white [animation-delay:-0.3s] ${className}`}
      ></div>
      <div
        className={`h-1 w-1 animate-bounce rounded-full bg-white [animation-delay:-0.15s] ${className}`}
      ></div>
      <div
        className={`h-1 w-1 animate-bounce rounded-full bg-white ${className}`}
      ></div>
    </div>
  );
};

export default LoadingDots;
