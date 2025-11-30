export default function Input({ label, type = "text", className = "", ...props }) {
  return (
    <div className="mb-3">
      {label && (
        <label className="block text-gray-700 text-sm font-medium mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${className}`}
        {...props}
      />
    </div>
  );
}
