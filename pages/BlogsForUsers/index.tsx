import { Blog } from "@/api/models/Blog";
import useFetch from "@/hooks/useFetch";
import { CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

type BlogPageProps = {
  blogs: Blog[]; // blogs from getStaticProps
};

export default function BlogsForUsers({ blogs: initialBlogs }: BlogPageProps) {
  const { data, loading } = useFetch<Blog[]>("/api/blogs");
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs || []);
  const [addingFavorite, setAddingFavorite] = useState<string | null>(null); // track blogId being favorited

  useEffect(() => {
    if (data) setBlogs(data);
  }, [data]);

  async function handleAddToFavorites(blogId: string) {
    const email = localStorage.getItem("email");
    if (!email) {
      alert("Ju lutem identifikohuni për të shtuar në të preferuarat.");
      return;
    }

    setAddingFavorite(blogId);

    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, blogId }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert("Gabim gjatë shtimit në të preferuarat: " + err.error);
      } else {
        alert("Blogu u shtua në të preferuarat!");
      }
    } catch (error) {
      alert("Gabim rrjeti gjatë shtimit në të preferuarat.");
    } finally {
      setAddingFavorite(null);
    }
  }

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
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleAddToFavorites(post._id)}
                        disabled={addingFavorite === post._id}
                        className={`px-5 py-2 rounded-lg font-semibold shadow-md transition duration-300 ${
                          addingFavorite === post._id
                            ? "bg-gray-400 cursor-not-allowed text-white"
                            : "bg-yellow-500 hover:bg-yellow-600 text-white"
                        }`}
                        aria-label={`Add blog titled ${post.title} to favorites`}
                      >
                        {addingFavorite === post._id ? "Po shtohet..." : "Shto në të preferuarat"}
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-center text-gray-500 text-lg col-span-full">
                  Asnjë blog nuk është gjetur në databazë.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
