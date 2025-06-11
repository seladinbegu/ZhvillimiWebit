import { Blog } from "@/api/models/Blog";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";

export default function UpdateBlog() {
  const router = useRouter();
  const { id } = router.query;
  const [newNews, setNewNews] = useState({ title: "", body: "" });

  // Early return if id is not available
  if (!id) {
    return <p>Loading...</p>;
  }

  // Use the `id` from the router to get the correct blog
  const { data: existingNews, loading, put } = useFetch<Blog>(`/api/news/${id}`);

  useEffect(() => {
    if (existingNews) {
      setNewNews({
        title: existingNews.title || "", // Ensure non-undefined value
        body: existingNews.body || "",   // Ensure non-undefined value
      });
    }
  }, [existingNews]);

  const handleUpdate = async () => {
    if (!newNews.title || !newNews.body || !id) {
      return alert("Please fill in both the title and body.");
    }
  
    const updatedNews = { ...newNews, id }; // Include the id in the payload
  
    try {
      const response = await put(updatedNews);  // `put` now returns the response
      if (response.ok) {
        alert("Blog updated successfully!");
        router.push("/news");
      } else {
        alert("Failed to update the news.");
      }
    } catch (error) {
      console.error("Error updating news:", error);
      alert("There was an error updating the news.");
    }
  };
  
  

  if (loading) return <p>Loading...</p>;

  return (
    <div className="pt-12 flex justify-center">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Update News</h2>
        
        <input
          type="text"
          placeholder="Enter the blog title"
          value={newNews.title}
          onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-md text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        
        <textarea
          placeholder="Enter the content of your blog"
          value={newNews.body}
          onChange={(e) => setNewNews({ ...newNews, body: e.target.value })}
          className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-md text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent h-40 resize-none"
        />
        
        <button
          onClick={handleUpdate}
          className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200"
        >
          Update News
        </button>
      </div>
    </div>
  );
  
}
