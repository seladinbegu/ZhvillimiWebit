// components/Header.js
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">
          <Link href="/" className="hover:text-yellow-300 transition-colors duration-300">
            BlogIn 🚀
          </Link>
        </h1>
        <nav className="space-x-6 text-lg font-medium">
          <Link href="/" className="hover:text-yellow-300 transition duration-300">Home</Link>
 <Link href="/About" className="hover:text-yellow-300 transition duration-300">
            About
          </Link>          <Link href="/Contact" className="hover:text-yellow-300 transition duration-300">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
