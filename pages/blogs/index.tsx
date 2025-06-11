import { Blog } from "@/api/models/Blog";
import useFetch from "@/hooks/useFetch";
import { CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

type BlogPageProps = {
  blogs: Blog[]; // blogs from getStaticProps
};

export default function BlogPage({ blogs: initialBlogs }: BlogPageProps) {
  const { data, loading, remove } = useFetch<Blog[]>("/api/blogs");
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs || []);

  useEffect(() => {
    if (data) setBlogs(data);
  }, [data]);

  const handleDeleteBlog = async (id: string) => {
    const confirmed = confirm("A je i sigurt për ta fshirë këtë blog?");
    if (!confirmed) return;

    try {
      await remove(`/api/blogs/${id}`);
      alert("Blog-u është fshirë me sukses.");
      setBlogs(blogs.filter((b) => b._id !== id));
    } catch (error) {
      alert("Gabim gjatë fshirjes së blogut!");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-16 tracking-tight">
          Blogs
        </h1>

        {loading ? (
          <div className="flex justify-center py-24">
            <CircularProgress size={60} />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {blogs && blogs.length > 0 ? (
                blogs.map((post: Blog) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 flex flex-col justify-between"
                  >
                    <div>
                      <h2 className="text-3xl font-semibold text-gray-900 mb-4 leading-snug">
                        {post.title}
                      </h2>
                      <p className="text-gray-700 text-base leading-relaxed mb-8 whitespace-pre-line max-h-36 overflow-hidden">
                        {post.body}
                      </p>
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => handleDeleteBlog(post._id)}
                        className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold shadow-md transition duration-300"
                        aria-label={`Delete blog titled ${post.title}`}
                      >
                        Fshij
                      </button>
                      <Link href={`/update/blog/${post._id}`}>
                        <button
                          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-md transition duration-300"
                          aria-label={`Edit blog titled ${post.title}`}
                        >
                          Ndrysho
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-center text-gray-500 text-lg col-span-full">
                  Asnjë blog nuk është gjetur në databazë.
                </p>
              )}
            </div>

            <div className="text-center mt-16">
              <Link href="/create/blog">
                <button
                  className="inline-block px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl text-lg font-bold shadow-lg transition duration-300"
                  aria-label="Create new blog"
                >
                  Krijo Blog
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/api/blogs`);
    const blogs: Blog[] = await res.json();

    return {
      props: { blogs },
      revalidate: 60, // ISR every 60 seconds
    };
  } catch (error) {
    console.error(error);
    return {
      props: { blogs: [] },
      revalidate: 60,
    };
  }
}

BlogPage.displayName = "Blogs | My Application";
