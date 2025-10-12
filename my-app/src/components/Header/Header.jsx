import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold text-slate-800">BowCourse</Link>
        <nav className="flex items-center gap-4">
          <Link to="/" className="text-sm text-slate-600 hover:text-slate-900"> Home</Link>
          <Link to="/create-account" className="text-sm text-slate-600 hover:text-slate-900">Create Account</Link>
          <Link to="/admin" className="px-3 py-1 bg-indigo-600 text-white rounded text-sm"> Admin</Link>
          <Link to="/student" className="px-3 py-1 border border-indigo-600 text-indigo-600 rounded text-sm">Student</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
