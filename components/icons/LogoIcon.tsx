export default function LogoIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 202 131"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`${process.env.SITE_NAME} logo`}
      {...props}
      className={
        props.className ? props.className : "fill-black dark:fill-white"
      }
    >
      <path d="M130.17 65.7992C130.17 52.9549 126.361 40.399 119.225 29.7194C112.089 19.0397 101.947 10.7159 90.0799 5.8006C78.2133 0.885287 65.1556 -0.400782 52.5581 2.10502C39.9606 4.61082 28.389 10.796 19.3067 19.8783C10.2244 28.9606 4.03929 40.5321 1.53349 53.1297C-0.972315 65.7272 0.313754 78.7849 5.22906 90.6515C10.1444 102.518 18.4682 112.661 29.1478 119.797C39.8275 126.933 52.3834 130.741 65.2277 130.741V65.7992H130.17Z" />
      <rect x="158.705" y="0.857178" width="43.2947" height="89.2953" />
      <rect
        x="158.705"
        y="98.2703"
        width="43.2947"
        height="32.471"
        fill="#590C0F"
      />
    </svg>
  );
}
