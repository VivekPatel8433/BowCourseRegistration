import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white shadow-lg p-5 fixed left-0 top-0">
      <h2 className="text-xl font-semibold mb-6">Dashboard</h2>

      <nav className="space-y-4">
        <Link className="block text-gray-700 hover:bg-gray-100 p-2 rounded" to="/student">
          My Courses
        </Link>
        <Link className="block text-gray-700 hover:bg-gray-100 p-2 rounded" to="/courses">
          All Courses
        </Link>
        <Link className="block text-gray-700 hover:bg-gray-100 p-2 rounded" to="/profile">
          Profile
        </Link>
      </nav>
    </aside>
  );
}
