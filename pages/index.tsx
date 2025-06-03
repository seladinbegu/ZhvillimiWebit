// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Welcome to <span className="text-yellow-300">BlogIn</span></h1>
          <p className="text-lg md:text-xl text-gray-200">
            Dive into daily stories, tech insights, and creative ideas from writers around the world.
          </p>
          <Link href="/blog" className="inline-block mt-8 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-lg transition">
            Explore Blogs
          </Link>
        </div>
      </section>

      {/* Featured Blog Cards */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Latest Posts</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow hover:shadow-xl transition p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">How to Start a Blog in 2025</h3>
            <p className="text-gray-600 mb-4">A complete step-by-step guide to building your blog with modern tools.</p>
            <Link href="/blog/start-blog-2025" className="text-indigo-600 hover:underline font-medium">
              Read More →
            </Link>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow hover:shadow-xl transition p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Top 10 Tools for Writers</h3>
            <p className="text-gray-600 mb-4">Boost productivity with these essential writing and editing tools.</p>
            <Link href="/blog/tools-for-writers" className="text-indigo-600 hover:underline font-medium">
              Read More →
            </Link>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow hover:shadow-xl transition p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">The Future of Blogging with AI</h3>
            <p className="text-gray-600 mb-4">Explore how artificial intelligence is changing the content game.</p>
            <Link href="/blog/ai-blogging-future" className="text-indigo-600 hover:underline font-medium">
              Read More →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
