import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import GoogleLoginButton from "../components/Buttons/googleloginbutton";
import AuthListener from "../components/AuthListener";

const adminEmails = [
  "beguseladin@gmail.com",
  "albanpasoma@gmail.com",
  "tefikujkani@gmail.com",
  "arlindkurti@gmail.com",
  "shqipronmusliu@gmail.com",
];

export default function SignIn({ csrfToken }: { csrfToken: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError(res.error);
    } else if (res?.url) {
      localStorage.setItem("email", email);
      localStorage.setItem("role", adminEmails.includes(email) ? "admin" : "user");
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-xl p-10">
        <h2 className="text-center text-4xl font-extrabold text-blue-900 mb-8 tracking-wide">
          Kyçu
        </h2>
        {error && (
          <div className="bg-red-100 text-red-800 p-4 mb-6 rounded-lg text-center font-medium shadow-inner">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-blue-900 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-600 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none transition"
          >
            Sign In
          </button>

          <div style={{ marginTop: 20 }}>
            <GoogleLoginButton />
          </div>
        </form>

        <AuthListener />
      </div>
    </div>
  );
}

SignIn.getInitialProps = async (context: any) => {
  return {
    csrfToken: await getCsrfToken(context),
  };
};

SignIn.displayName = "Sign In | My Application";
