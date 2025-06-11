import {
  deleteFavorite,
  getFavoriteById,
  updateFavorite,
} from "@/api/services/Favorites";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  // Make sure id is a string for ObjectId usage
  if (typeof id !== "string") {
    return res.status(400).json({ message: "Invalid id parameter." });
  }

  if (req.method === "GET") {
    try {
      const favorite = await getFavoriteById(id);
      return res.status(200).json(favorite);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Gabim gjatë marrjes së favorite." });
    }
  } else if (req.method === "PUT") {
    try {
      const newFavorite = req.body;
      const result = await updateFavorite(id, newFavorite);
      return res.status(200).json(result); // 200 OK for success
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Gabim gjatë përditësimit të favorite." });
    }
  } else if (req.method === "DELETE") {
    try {
      const deleted = await deleteFavorite(id);
      return res.status(200).json(deleted);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Gabim gjatë fshirjes së favorite." });
    }
  } else {
    return res
      .status(405)
      .json({ message: "Metoda e kërkesës nuk është e mbështetur." });
  }
}
