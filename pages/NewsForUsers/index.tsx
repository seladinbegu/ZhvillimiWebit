import { News } from "@/api/models/News";
import useFetch from "@/hooks/useFetch";
import { useNewsContext } from "@/lib/contexts/NewsContext";
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NewsForUsers() {
  const { news, setNews } = useNewsContext();
  const { data, loading, remove } = useFetch<News[]>("/api/news");

  useEffect(() => {
    if (data) {
      setNews(data);
    }
  }, [data]);

  const handleDeleteNews = async (id: string) => {
    const confirmed = confirm("A je i sigurt për ta fshirë këtë lajm?");
    if (!confirmed) return;

    try {
      await remove(`/api/news/${id}`);
      alert("Lajmi është fshirë me sukses.");
      setNews(news.filter((n) => n._id !== id));
    } catch (error) {
      alert("Gabim gjatë fshirjes së lajmit!");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          News
        </h1>

        {loading ? (
          <div className="flex justify-center">
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news && news.length > 0 ? (
                news.map((post: News) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-xl shadow-lg p-6 border"
                  >
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                      {post.title}
                    </h2>
                    <p className="text-gray-700 mb-6">{post.body}</p>
                    {/* <div className="flex justify-between">
                      <button
                        onClick={() => handleDeleteNews(post._id)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
                      >
                        Fshij
                      </button>
                      <Link href={`/update/news/${post._id}`}>
                        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition">
                          Ndrysho
                        </button>
                      </Link>
                    </div> */}
                  </motion.div>
                ))
              ) : (
                <p className="text-center text-gray-600 col-span-full">
                  Asnjë lajm nuk është gjetur në databazë.
                </p>
              )}
            </div>

            {/* <div className="text-center mt-12">
              <Link href="/create/news">
                <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition">
                  Krijo News
                </button>
              </Link>
            </div> */}
          </>
        )}
      </div>
    </div>
  );
}

NewsForUsers.displayName = "News | My Application";
