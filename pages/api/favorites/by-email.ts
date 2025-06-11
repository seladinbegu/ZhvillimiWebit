import { NextApiRequest, NextApiResponse } from "next";
import { getFavoritesByEmail } from "@/api/services/Favorites";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const email = req.query.email as string;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const favorites = await getFavoritesByEmail(email);
    return res.status(200).json(favorites);
  } catch (error) {
    console.error("Error in /api/favorites/by-email:", error);
    return res
      .status(500)
      .json({ message: "Failed to get favorites by email" });
  }
}
