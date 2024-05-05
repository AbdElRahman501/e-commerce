import {
  ProductDetailSkeleton,
  ProductSkeleton,
} from "@/components/LoadingSkeleton";

export default function Loading() {
  return (
    <>
      <ProductDetailSkeleton />
      <ProductSkeleton />
    </>
  );
}
