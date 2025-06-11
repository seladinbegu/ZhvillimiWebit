import { createNews, getNews } from "@/api/services/News";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const news = await getNews();
      res.status(200).json(news);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch news" });
    }
  } else if (req.method === "POST") {
    try {
      const newNews = req.body;
      const result = await createNews(newNews);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to create news" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
