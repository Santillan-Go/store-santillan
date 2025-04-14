export function ProductsSqueleton() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Title Skeleton */}
      <div className="mb-8">
        <div className="h-10 w-64 bg-gray-200 rounded-lg animate-pulse" />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <article
            key={index}
            className="bg-white rounded-2xl p-4 shadow-sm animate-pulse"
          >
            {/* Image Skeleton */}
            <div className="aspect-square w-full bg-gray-200 rounded-xl mb-4" />

            {/* Title Skeleton */}
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded-lg w-3/4" />
              <div className="h-4 bg-gray-200 rounded-lg w-1/2" />
            </div>

            {/* Price and Button Skeleton */}
            <div className="mt-6 flex items-center justify-between">
              <div className="h-6 w-20 bg-gray-200 rounded-lg" />
              <div className="h-10 w-28 bg-gray-200 rounded-lg" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
