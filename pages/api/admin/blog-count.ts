// pages/api/admin/blog-count.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getBlogCount } from "@/api/services/Blog";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const count = await getBlogCount();
    res.status(200).json({ count });
  } catch (error) {
    console.error("Failed to fetch blog count:", error);
    res.status(500).json({ error: "Failed to fetch blog count" });
  }
}
