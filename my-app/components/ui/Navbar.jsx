import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-primary text-white px-6 py-4 shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold">Bow Course Portal</h1>

        <div className="space-x-6">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/student" className="hover:text-gray-200">Student</Link>
          <Link to="/admin" className="hover:text-gray-200">Admin</Link>
        </div>
      </div>
    </nav>
  );
}
