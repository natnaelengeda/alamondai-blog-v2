export default function BlogSkeleton() {
  return (
    <div className="w-full animate-pulse space-y-4 p-4  max-w-3xl mx-auto">
      <div className="h-48 bg-gray-200 rounded"></div>

      <div className="space-y-2 mt-4">
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        <div className="h-3 bg-gray-200 rounded w-4/6"></div>
      </div>

      {/* Profile Cicle */}
      <div className="w-full flex flex-row items-start justify-start gap-3">
        <div className="w-12 h-10 rounded-full bg-gray-300">
        </div>
        <div className="w-full flex flex-col items-start justify-start gap-2">
          <div className="h-6 bg-gray-300 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
}
