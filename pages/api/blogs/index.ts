import { NextApiRequest, NextApiResponse } from "next";
import { getBlogs, createBlog } from "@/api/services/Blog";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const blogs = await getBlogs();
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blogs" });
    }
  } else if (req.method === "POST") {
    try {
      const newBlog = req.body;
      const result = await createBlog(newBlog);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to create blog" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
