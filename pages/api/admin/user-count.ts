// pages/api/admin/user-count.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getUserCount } from "@/api/services/User";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const count = await getUserCount();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user count" });
  }
}
