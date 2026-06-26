export default function BoardColumn({ title, children }) {
  return (
    <div className="bg-gray-100 border border-gray-200 rounded-2xl shadow-sm p-4 min-h-[500px]">

      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-gray-800">
          {title}
        </h2>

        <span className="bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-600">
          0
        </span>
      </div>

      <div className="space-y-4 overflow-y-auto max-h-[450px]">
        {children}
      </div>

    </div>
  );
}