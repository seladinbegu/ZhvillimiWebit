import useFetch from "@/hooks/useFetch";
import { User } from "next-auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { signIn } from "next-auth/react";


export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const { post } = useFetch<User[]>("/api/auth/register");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await post(user);

    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/sign-in");
    }
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-xl p-10">
        <h2 className="text-center text-4xl font-extrabold text-blue-900 mb-8 tracking-wide">
          Regjistrohu
        </h2>

        {error && (
          <div className="bg-red-100 text-red-800 p-4 mb-6 rounded-lg text-center font-medium shadow-inner">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-blue-900 font-semibold mb-2">
              Emri
            </label>
            <input
              type="text"
              id="name"
              placeholder="Emri"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-600 transition"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-blue-900 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-600 transition"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-blue-900 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-600 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none transition"
          >
            Regjistrohu
          </button>
          <button
            onClick={() => signIn("google")}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
}

SignUp.displayName = "Sign Up | My Application";
