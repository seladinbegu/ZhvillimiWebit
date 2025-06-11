"use client";

import { useEffect, useState } from "react";
import { User } from "@/api/models/User";
import { useRouter } from "next/router";

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [blogCount, setBlogCount] = useState<number | null>(null);
    const [newsCount, setNewsCount] = useState<number | null>(null);

  const [loadingCount, setLoadingCount] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
    const [loadingNews, setLoadingNews] = useState(true);


  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      router.replace("/");
    }
  }, [router]);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetch("/api/admin/user-count");
        const data = await response.json();
        setUserCount(data.count);
      } catch (err) {
        console.error("Error fetching user count:", err);
      } finally {
        setLoadingCount(false);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/admin/userlist");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoadingUsers(false);
      }
    };

    const fetchBlogCount = async () => {
      try {
        const response = await fetch("/api/admin/blog-count");
        const data = await response.json();
        setBlogCount(data.count);
      } catch (err) {
        console.error("Error fetching blog count:", err);
      } finally {
        setLoadingBlogs(false);
      }
    };
      const fetchNewsCount = async () => {
      try {
        const response = await fetch("/api/admin/news-count");
        const data = await response.json();
setNewsCount(data.count); // ✅ Correct
      } catch (err) {
        console.error("Error fetching news count:", err);
      } finally {
setLoadingNews(false); // ✅ Correct
      }
    };

    fetchUserCount();
    fetchUsers();
    fetchBlogCount();
    fetchNewsCount();
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-4xl p-8 rounded-lg shadow-lg bg-white">
        <h1 className="text-3xl font-extrabold mb-8 text-gray-900 text-center">
          Admin Dashboard
        </h1>

        {loadingCount ? (
          <p className="text-gray-500 mb-4 text-center">Loading user count...</p>
        ) : (
          <p className="text-xl mb-4 text-center text-black">
            Total Users:{" "}
            <span className="font-semibold text-indigo-600">{userCount}</span>
          </p>
        )}

        {loadingBlogs ? (
          <p className="text-gray-500 mb-8 text-center">Loading blog count...</p>
        ) : (
          <p className="text-xl mb-8 text-center text-black">
            Total Blogs:{" "}
            <span className="font-semibold text-indigo-600">{blogCount}</span>
          </p>
        )}
         {loadingNews ? (
          <p className="text-gray-500 mb-8 text-center">Loading news count...</p>
        ) : (
          <p className="text-xl mb-8 text-center text-black">
            Total News:{" "}
            <span className="font-semibold text-indigo-600">{newsCount}</span>
          </p>
        )}

        <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
          All Users
        </h2>
        {loadingUsers ? (
          <p className="text-gray-500 text-center">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-gray-500 text-center">No users found.</p>
        ) : (
          <ul className="divide-y divide-gray-200 border border-gray-200 rounded-md">
            {users.map((user: User) => (
              <li
                key={user.email}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 hover:bg-indigo-50 transition-colors"
              >
                <p className="text-lg font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500 mt-1 sm:mt-0 text-right w-full sm:w-auto">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "N/A"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
