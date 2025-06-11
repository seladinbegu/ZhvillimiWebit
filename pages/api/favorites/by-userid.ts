import type { NextApiRequest, NextApiResponse } from "next";
import { getFavoritesByUserId } from "@/api/services/Favorites";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const userId = req.query.userId as string;

  if (!userId) {
    return res.status(400).json({ message: "Missing userId parameter" });
  }

  try {
    const favorites = await getFavoritesByUserId(userId);
    res.setHeader("Cache-Control", "no-store"); // optional: prevent caching
    return res.status(200).json(favorites);
  } catch (error) {
    console.error("Failed to fetch favorites:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
