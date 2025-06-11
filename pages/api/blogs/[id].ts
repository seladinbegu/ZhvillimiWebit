import { deleteBlog, getBlog, updateBlog } from "@/api/services/Blog";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const blog = await getBlog(id as string);
      return res.status(200).json(blog);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Gabim gjatë marrjes së blogut." });
    }
  } else if (req.method === "PUT") {
    try {
      const newBlog = req.body;
      const result = await updateBlog(id as string, newBlog);
      return res.status(200).json(result); // Use 200 OK for successful PUT
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Gabim gjatë përditësimit të blogut." });
    }
  } else if (req.method === "DELETE") {
    try {
      const blog = await deleteBlog(id as string);
      return res.status(200).json(blog);
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
