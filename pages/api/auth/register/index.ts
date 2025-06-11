import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/api/models/User";
import { createUser, getUser } from "@/api/services/User";
import { error } from "console";
import bcrypt from "bcryptjs";
import { create } from "domain";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email, password } = req.body as User;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Ju lutem plotesoni te gjitha fushat" });
    }
    try {
      const existingUser = await getUser(email);
      if (existingUser) {
        return res
          .status(409)
          .json({ error: "Email-i eshte regjistruar tashme" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        name,
        email,
        password: hashedPassword,
        createdAt: new Date(),
      };

      const result = await createUser(newUser);
      res.status(201).json({
        message: "Perdoruesi u regjistrua me sukses",
        userId: result.insertedId,
      });
    } catch (error) {
      res.status(500).json({ error: "Gabim gjate regjistrimit" });
    }
  } else {
    res.status(405).json({ error: "Metoda e kerkeses nuk eshte mbeshtetur" });
  }
}
