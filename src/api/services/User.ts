import clientPromise from "@/lib/mongodb";
import { User } from "@/api/models/User";
import { ObjectId } from "mongodb";

export async function createUser(data: User) {
  const client = await clientPromise;
  const db = client.db("BlogIn");
  const result = await db.collection("users").insertOne({
    ...data,
    createdAt: new Date(),
  });
  return result;
}

export async function getUser(email: string) {
  const client = await clientPromise;
  const db = client.db("BlogIn");
  const user = await db.collection("users").findOne({ email: email });
  return user;
}

export async function getUserIdByEmail(email: string): Promise<string | null> {
  const client = await clientPromise;
  const db = client.db("BlogIn");
  const user = await db
    .collection("users")
    .findOne({ email }, { projection: { _id: 1 } });
  if (!user) return null;
  return user._id.toString();
}

export async function getUserCount() {
  const client = await clientPromise;
  const db = client.db("BlogIn");
  const count = await db.collection("users").countDocuments();
  return count;
}

export async function getAllUsers() {
  const client = await clientPromise;
  const db = client.db("BlogIn");
  const users = await db.collection("users").find().toArray();
  return users;
}

/**
 * Sends a request to update a user's email and/or password.
 *
 * @param newEmail - The new email to update to
 * @param newPassword - The new password to update to
 * @returns A response object from the server or throws an error
 */
export async function updateCredentials(newEmail: string, newPassword: string) {
  const currentEmail = localStorage.getItem("userEmail");
  if (!currentEmail) {
    throw new Error("No user email found in localStorage.");
  }

  // Get user ID by current email
  const userId = await getUserIdByEmail(currentEmail);
  if (!userId) {
    throw new Error("User not found.");
  }

  const response = await fetch("/api/update-credentials", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId, // include userId here
      currentEmail,
      newEmail,
      newPassword,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update credentials");
  }

  return result;
}
