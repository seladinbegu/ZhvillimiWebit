import { deleteNews, getSingleNews, updateNews } from "@/api/services/News";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const news = await getSingleNews(id as string);
      return res.status(200).json(news);
    } catch (error) {
      return res.status(500).json({ message: "Gabim gjatë marrjes së news." });
    }
  } else if (req.method === "PUT") {
    try {
      const newNews = req.body;
      const result = await updateNews(id as string, newNews);
      return res.status(200).json(result); // Use 200 OK for successful PUT
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Gabim gjatë përditësimit të news." });
    }
  } else if (req.method === "DELETE") {
    try {
      const news = await deleteNews(id as string);
      return res.status(200).json(news);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Gabim gjatë fshirjes së blogut." });
    }
  } else {
    return res
      .status(405)
      .json({ message: "Metoda e kërkesës nuk është e mbështetur." });
  }
}
