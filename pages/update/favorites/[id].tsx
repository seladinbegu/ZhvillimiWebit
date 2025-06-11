import { Favorites } from "@/api/models/Favorites";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";

export default function UpdateFavorite() {
  const router = useRouter();
  const { id } = router.query;

  // Adjusted state for Favorites model (adjust fields accordingly)
  const [newFavorite, setNewFavorite] = useState<Favorites>({
    userId: "",
    blogId: "",
  });

  // Early return if id is not available
  if (!id) {
    return <p>Loading...</p>;
  }

  // Fetch the existing favorite by ID
  const { data: existingFavorite, loading, put } = useFetch<Favorites>(`/api/favorites/${id}`);

  useEffect(() => {
    if (existingFavorite) {
      setNewFavorite({
        userId: existingFavorite.userId || "",
        blogId: existingFavorite.blogId || "",
      });
    }
  }, [existingFavorite]);

  const handleUpdate = async () => {
    if (!newFavorite.userId || !newFavorite.blogId || !id) {
      return alert("Please fill in both User ID and Blog ID.");
    }

    const updatedFavorite = { ...newFavorite, id };

    try {
      const response = await put(updatedFavorite);
      if (response.ok) {
        alert("Favorite updated successfully!");
        router.push("/favorites");
      } else {
        alert("Failed to update the favorite.");
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
      alert("There was an error updating the favorite.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="pt-12 flex justify-center">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Update Favorite</h2>

        <input
          type="text"
          placeholder="Enter User ID"
          value={newFavorite.userId}
          onChange={(e) => setNewFavorite({ ...newFavorite, userId: e.target.value })}
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-md text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />

        <input
          type="text"
          placeholder="Enter Blog ID"
          value={newFavorite.blogId}
          onChange={(e) => setNewFavorite({ ...newFavorite, blogId: e.target.value })}
          className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-md text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />

        <button
          onClick={handleUpdate}
          className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200"
        >
          Update Favorite
        </button>
      </div>
    </div>
  );
}
