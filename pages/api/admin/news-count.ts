// pages/api/admin/blog-count.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getNewsCount } from "@/api/services/News";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const count = await getNewsCount();
    res.status(200).json({ count });
  } catch (error) {
    console.error("Failed to fetch news count:", error);
    res.status(500).json({ error: "Failed to fetch blog count" });
  }
}
