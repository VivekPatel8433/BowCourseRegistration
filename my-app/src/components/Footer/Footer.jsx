function Footer() {
  return (
    <footer className="w-full bg-slate-50 border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 py-6 text-sm text-slate-500">
        © {new Date().getFullYear()} Bow Course. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
