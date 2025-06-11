import { useEffect, useState } from "react";
import { Blog } from "@/api/models/Blog";
import { CircularProgress } from "@mui/material";
import { motion } from "framer-motion";

interface Favorite {
  _id: string;       // favorite document ID for delete
  userId: string;
  blogId: string;
}

interface User {
  _id: string;
  email: string;
  // add other fields if needed
}

export default function FavoritesPage() {
  const [blogs, setBlogs] = useState<(Blog & { favoriteId: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null); // favoriteId being deleted

 useEffect(() => {
  const fetchFavoritesAndBlogs = async () => {
    const email = localStorage.getItem("email");
    if (!email) {
      console.error("No email in localStorage");
      setLoading(false);
      return;
    }

    // Fetch userId by email
        const userIdRes = await fetch(`/api/user/profile?email=${email}`);
    if (!userIdRes.ok) {
      console.error("Failed to fetch userId");
      setLoading(false);
      return;
    }
    const { userId } = await userIdRes.json();
    if (!userId) {
      console.error("UserId not found");
      setLoading(false);
      return;
    }

    // Fetch favorites by userId
    const favRes = await fetch(`/api/favorites/by-userid?userId=${userId}`);
    if (!favRes.ok) {
      const errorData = await favRes.json();
      throw new Error(errorData.message || "Failed to fetch favorites");
    }
    const favorites = await favRes.json();

   if (!Array.isArray(favorites) || favorites.length === 0) {
  setBlogs([]);
  setLoading(false);
  return;
}


    // Fetch each blog and keep favorite ID
    const blogsData = await Promise.all(
      favorites.map(async (fav: any) => {
        const blogRes = await fetch(`/api/blogs/${fav.blogId}`);
        if (!blogRes.ok) {
          console.error(`Failed to fetch blog ${fav.blogId}`);
          return null;
        }
        const blog = await blogRes.json();
        return { ...blog, favoriteId: fav._id };
      })
    );

    setBlogs(blogsData.filter((b): b is Blog & { favoriteId: string } => b !== null));
    setLoading(false);
  };

  fetchFavoritesAndBlogs().catch((error) => {
    console.error("Error fetching favorites and blogs:", error);
    setLoading(false);
  });
}, []);

  const handleDelete = async (favoriteId: string) => {
    if (!confirm("Are you sure you want to remove this favorite?")) return;

    try {
      setDeleting(favoriteId);
      const res = await fetch(`/api/favorites/${favoriteId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete favorite");
      }

      // Remove deleted favorite from state
      setBlogs((prev) => prev.filter((b) => b.favoriteId !== favoriteId));
    } catch (error) {
      alert(`Error deleting favorite: ${(error as Error).message}`);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-10 text-black">
        My Favorite Blogs
      </h1>

      {loading ? (
        <div className="flex justify-center mt-32">
          <CircularProgress size={60} />
        </div>
      ) : blogs.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No favorites found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
            >
              <h2 className="text-xl font-semibold text-black mb-2">{blog.title}</h2>
              <p className="text-gray-800 text-base">{blog.body}</p>

              <button
                disabled={deleting === blog.favoriteId}
                onClick={() => handleDelete(blog.favoriteId)}
                className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition disabled:opacity-50"
              >
                {deleting === blog.favoriteId ? "Removing..." : "Remove"}
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
