export default function Ex_icon({ className }: { className?: string }) {
  return (
    <svg
      className={className + " fill-current"}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M12 1.5C6.15 1.5 1.5 6.15 1.5 12C1.5 17.85 6.15 22.5 12 22.5C17.85 22.5 22.5 17.85 22.5 12C22.5 6.15 17.85 1.5 12 1.5ZM12 21C7.05 21 3 16.95 3 12C3 7.05 7.05 3 12 3C16.95 3 21 7.05 21 12C21 16.95 16.95 21 12 21Z" />
      <path d="M16.05 17.25L12 13.2L7.95 17.25L6.75 16.05L10.8 12L6.75 7.95L7.95 6.75L12 10.8L16.05 6.75L17.25 7.95L13.2 12L17.25 16.05L16.05 17.25Z" />
    </svg>
  );
}