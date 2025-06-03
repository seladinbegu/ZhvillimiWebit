// components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} <span className="font-semibold text-white">BlogIn</span>. All rights reserved.
        </p>
        <p className="mt-2 text-xs opacity-70 hover:opacity-100 transition duration-300">
          Built with <span className="text-pink-400">Next.js</span> & ❤️
        </p>
      </div>
    </footer>
  );
}
