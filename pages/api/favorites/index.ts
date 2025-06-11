import { NextApiRequest, NextApiResponse } from "next";
import { getFavorites, createFavorite } from "@/api/services/Favorites";
import { getUser } from "@/api/services/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const favorites = await getFavorites();
      res.status(200).json(favorites);
    } catch (error) {
      console.error("GET /api/favorites error:", error);
      res.status(500).json({ error: "Failed to fetch favorites" });
    }
  } else if (req.method === "POST") {
    try {
      const { email, blogId } = req.body;

      if (!email || !blogId) {
        return res.status(400).json({ error: "Email and blogId are required" });
      }

      const user = await getUser(email);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const newFavorite = {
        userId: user._id.toString(), // Ensure _id is stored as a string
        blogId,
        createdAt: new Date(),
      };

      const result = await createFavorite(newFavorite);
      res.status(201).json(result);
    } catch (error) {
      console.error("POST /api/favorites error:", error);
      res.status(500).json({ error: "Failed to create favorite" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
