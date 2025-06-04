// components/DashboardSkeleton.jsx
export const DashboardSkeleton = () => {
  return (
    <div className="mt-4 space-y-4 animate-pulse">
      <div className="h-20 bg-gray-200 rounded-md w-3/4"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 rounded"></div>
        ))}
      </div>
      <div className="h-64 bg-gray-200 rounded"></div>
    </div>
  );
};