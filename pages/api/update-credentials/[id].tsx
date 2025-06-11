import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import { getUser } from '@/api/services/User';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { newEmail, newPassword, currentEmail } = req.body;

  if (!currentEmail || (!newEmail && !newPassword)) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const user = await getUser(currentEmail);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const client = await clientPromise;
    const db = client.db("BlogIn");

    const updateFields: any = {};
    if (newEmail) updateFields.email = newEmail;
    if (newPassword) {
      // Hash the new password before updating
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      updateFields.password = hashedPassword;
    }

    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(user._id) },
      { $set: updateFields }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json({ message: 'No changes were made' });
    }

    return res.status(200).json({ message: 'Credentials updated successfully' });
  } catch (error: any) {
    console.error('Error updating credentials:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
