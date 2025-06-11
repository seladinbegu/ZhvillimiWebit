"use client";

import { signIn } from "next-auth/react";

export default function GoogleLoginButton() {
  return (
    <button
      onClick={() => signIn("google")}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Sign in with Google
    </button>
  );
}
