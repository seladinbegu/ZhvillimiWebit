import { Favorites } from "@/api/models/Favorites";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/router";
import { useState } from "react";

export default function CreateFavorite() {
  const router = useRouter();
  const [newFavorite, setNewFavorite] = useState<Favorites>({ userId: "", blogId: "" });
  const { post } = useFetch<Favorites[]>("/api/favorites");

  const handleCreate = async () => {
    if (!newFavorite.userId || !newFavorite.blogId) {
      return alert("Please fill in both User ID and Blog ID.");
    }
    await post(newFavorite);
    setNewFavorite({ userId: "", blogId: "" });
    router.push("/favorites"); // Adjust redirect as needed
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Shto një Favorite të re
        </h2>

        <input
          type="text"
          placeholder="User ID"
          value={newFavorite.userId}
          onChange={(e) => setNewFavorite({ ...newFavorite, userId: e.target.value })}
          className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black placeholder-gray-400"
        />

        <input
          type="text"
          placeholder="Blog ID"
          value={newFavorite.blogId}
          onChange={(e) => setNewFavorite({ ...newFavorite, blogId: e.target.value })}
          className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black placeholder-gray-400"
        />

        <button
          onClick={handleCreate}
          className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Shto Favorite
        </button>
      </div>
    </div>
  );
}

CreateFavorite.displayName = "Create Favorite | My App";
