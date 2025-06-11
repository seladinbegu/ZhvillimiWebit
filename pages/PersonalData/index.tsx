import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface UserData {
  id: string;
  name: string;
  email: string;
}

export default function PersonalData() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const email = localStorage.getItem("email");

      if (!email) {
        setError("User is not logged in.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/user/profile?email=${encodeURIComponent(email)}`);

const contentType = res.headers.get("content-type");

        if (!res.ok) {
          if (contentType?.includes("application/json")) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to fetch profile");
          } else {
            const errorText = await res.text();
            throw new Error(`Failed to fetch profile: ${errorText.slice(0, 100)}`);
          }
        }

        if (contentType?.includes("application/json")) {
          const data = (await res.json()) as UserData;
          setUser(data);
        } else {
          const text = await res.text();
          throw new Error(`Unexpected response format: ${text.slice(0, 100)}`);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateClick = () => {
    if (user?.id) {
      router.push(`/update/user/${user.id}`);
    } else {
      alert("Invalid user ID");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">
        <p className="text-indigo-700 text-2xl font-semibold animate-pulse">
          Loading your data...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-50 p-6">
        <div className="max-w-3xl w-full bg-red-100 rounded-3xl shadow-lg border border-red-300 p-10">
          <p className="text-red-800 font-bold text-center text-xl">{error}</p>
        </div>
      </div>
    );

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center px-6 py-16">
      <section className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl border border-gray-300 p-12 flex flex-col md:flex-row gap-12">
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-5xl font-extrabold mb-10 text-blue-700 select-none">
            Personal Data
          </h1>
          <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
            Here’s your account information. Keep it safe and update as needed.
          </p>
        </div>

        <div className="flex-1 bg-indigo-50 rounded-2xl p-8 shadow-inner border border-indigo-200 flex flex-col justify-between">
          <div className="space-y-10 text-gray-800 text-xl">
            <div className="flex justify-between items-center border-b border-indigo-200 pb-4">
              <span className="font-semibold">Name:</span>
              <span className="text-indigo-700 font-medium">{user?.name || "N/A"}</span>
            </div>
            <div className="flex justify-between items-center border-b border-indigo-200 pb-4">
              <span className="font-semibold">Email:</span>
              <span className="text-indigo-700 font-medium">{user?.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Password:</span>
              <span className="text-indigo-400 italic tracking-widest select-none">
                ••••••••••••
              </span>
            </div>
          </div>
          <button
            onClick={handleUpdateClick}
            className="mt-12 w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-3 rounded-xl shadow-md select-none"
            type="button"
          >
            Update Your Credentials
          </button>
        </div>
      </section>
    </main>
  );
}
