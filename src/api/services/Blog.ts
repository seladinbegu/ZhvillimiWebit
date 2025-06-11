import { ObjectId } from "mongodb";
import { Blog } from "../models/Blog";
import clientPromise from "@/lib/mongodb";

export async function createBlog(data: Blog) {
  const client = await clientPromise;
  const db = client.db("BlogIn");
  const result = await db.collection("blogs").insertOne({
    ...data,
    createdAt: new Date(),
  });
  return result;
}

export async function getBlogs() {
  const client = await clientPromise;
  const db = client.db("BlogIn");
  const blogs = await db
    .collection("blogs")
    .find()
    .sort({ createdAt: -1 })
    .toArray();
  return blogs;
}

export async function getBlog(id: string) {
  const client = await clientPromise;
  const db = client.db("BlogIn");
  const blog = await db.collection("blogs").findOne({ _id: new ObjectId(id) });

  return blog;
}

export async function updateBlog(id: string, data: Blog) {
  const client = await clientPromise;
  const db = client.db("BlogIn");
  const blog = await db
    .collection("blogs")
    .updateOne({ _id: new ObjectId(id) }, { $set: data });
  return blog;
}

export async function deleteBlog(id: string) {
  const client = await clientPromise;
  const db = client.db("BlogIn");
  const blog = await db
    .collection("blogs")
    .deleteOne({ _id: new ObjectId(id) });
  return blog;
}

export async function getBlogCount() {
  const client = await clientPromise;
  const db = client.db("BlogIn");
  const count = await db.collection("blogs").countDocuments();
  return count;
}
