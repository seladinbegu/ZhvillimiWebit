// pages/index.js
import Link from 'next/link';
import Card from './components/Card';

export default function Home() {
  return (
<div className="bg-gray-50 ">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Welcome to <span className="text-yellow-300">BlogIn</span></h1>
          <p className="text-lg md:text-xl text-gray-200">
            Dive into daily stories, tech insights, and creative ideas from writers around the world.
          </p>
          <Link href="/blogs" className="inline-block mt-8 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-lg transition">
            Explore Blogs
          </Link>
        </div>
      </section>
      


<section className="max-w-7xl mx-auto px-6 py-16">
  <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Latest Posts</h2>
  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
    <Card
      title="How to Start a Blog in 2025"
      description="A complete step-by-step guide to building your blog with modern tools."
      href="/HowToStartBlogging2025"
    />
    <Card
      title="Top 10 Tools for Writers"
      description="Boost productivity with these essential writing and editing tools."
      href="/TopTools"
    />
    <Card
      title="The Future of Blogging with AI"
      description="Explore how artificial intelligence is changing the content game."
      href="/blog/ai-blogging-future"
    />
  </div>
</section>

    </div>
  );
}
