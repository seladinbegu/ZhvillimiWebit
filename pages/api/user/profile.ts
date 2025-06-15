import type { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "@/api/services/User"; // adjust import path if needed

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const email = req.query.email as string;

  if (!email) {
    return res.status(400).json({ message: "Missing email parameter" });
  }

  try {
    const user = await getUser(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Optionally sanitize user object before returning
    const { _id, name, email: userEmail } = user;

    return res.status(200).json({
      userId: _id.toString(), // <-- changed here to 'userId'
      name,
      email: userEmail,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}