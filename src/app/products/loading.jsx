const SkeletonCard = () => (
  <div className="flex flex-col overflow-hidden rounded-2xl border border-[#E7E1D4] bg-[#FBF9F4]">
    <div className="aspect-[4/5] w-full animate-pulse bg-[#EFE9DC]" />
    <div className="space-y-2 px-4 pb-4 pt-3">
      <div className="h-4 w-3/4 animate-pulse rounded bg-[#EFE9DC]" />
      <div className="h-3 w-1/2 animate-pulse rounded bg-[#EFE9DC]" />
      <div className="h-4 w-1/3 animate-pulse rounded bg-[#EFE9DC]" />
    </div>
  </div>
);

export default function Loading() {
  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-6 h-6 w-40 animate-pulse rounded bg-[#EFE9DC] md:mb-8" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </section>
  );
}