export { default } from "next-auth/middleware";

export const config = {
  matcher: (route: string) => {
    // Apply the middleware only to the exact "/dashboard" route
    return route === "/dashboard";
  },
};
