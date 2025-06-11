import clientPromise from "@/lib/mongodb";
import { Favorites } from "../models/Favorites";
import { ObjectId } from "mongodb";
import { getUser } from "./User";

export async function createFavorite(data: Favorites) {
  const client = await clientPromise;
  const db = client.db("BlogIn");
  const result = await db.collection("favorites").insertOne({
    ...data,
    createdAt: new Date(),
  });
  return result;
}

export async function getFavorites() {
  const client = await clientPromise;
  const db = client.db("BlogIn");
  const favorites = await db
    .collection("favorites")
    .find()
    .sort({ createdAt: -1 })
    .toArray();
  return favorites;
}

export async function getFavoriteById(id: string) {
  const client = await clientPromise;
  const db = client.db("BlogIn");
  const favorite = await db
    .collection("favorites")
    .findOne({ _id: new ObjectId(id) });
  return favorite;
}

export async function updateFavorite(id: string, data: Favorites) {
  const client = await clientPromise;
  const db = client.db("BlogIn");
  const updated = await db
    .collection("favorites")
    .updateOne({ _id: new ObjectId(id) }, { $set: data });
  return updated;
}

export async function deleteFavorite(id: string) {
  const client = await clientPromise;
  const db = client.db("BlogIn");
  const deleted = await db
    .collection("favorites")
    .deleteOne({ _id: new ObjectId(id) });
  return deleted;
}

export async function getFavoriteCount() {
  const client = await clientPromise;
  const db = client.db("BlogIn");
  const count = await db.collection("favorites").countDocuments();
  return count;
}

export async function getFavoritesByEmail(email: string) {
  const client = await clientPromise;
  const db = client.db("BlogIn");

  // Get the user by email to get the userId
  const user = await getUser(email);
  if (!user || !user._id) {
    throw new Error("User not found or invalid _id");
  }

  const favorites = await db
    .collection("favorites")
    .find({ userId: new ObjectId(user._id) })
    .toArray();

  return favorites;
}

export async function getFavoritesByUserId(userId: string) {
  const client = await clientPromise;
  const db = client.db("BlogIn");
  const favorites = await db.collection("favorites").find({ userId }).toArray();
  return favorites;
}
