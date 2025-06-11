"use client"; // Next.js 13+ app directory
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  // State to hold username from localStorage
  const [email, setEmail] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);


  // On mount, read username from localStorage
  useEffect(() => {
    const storedName = localStorage.getItem("email");
    if (storedName) setEmail(storedName);
  }, []);
   useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) setRole(storedRole);
  }, []);

  const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/About" },
  { name: "Contact", path: "/Contact" },
    ...(role === "user" ? [{ name: "Favorites", path: "/favorites" }] : []),

  // { name: "News", path: "/news" },
      ...(role === "admin" ? [{ name: "News For Admin", path: "/news" }] : [{ name: "News", path: "/NewsForUsers" }]),

  // { name: "Blogs", path: "/blogs" },
    ...(role === "admin" ? [{ name: "Blogs For Admin", path: "/blogs" }] : [{ name: "Blogs", path: "/BlogsForUsers" }]),

  ...(role === "admin" ? [{ name: "Admin Dashboard", path: "/AdminDashboard" }] : []),
];


  const handleLogout = () => {
    // Clear localStorage items
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("username");

    // Sign out and redirect to /sign-in
    signOut({ callbackUrl: "/sign-in" });
  };

  // Shared styles for buttons
  const buttonStyles = {
    borderRadius: "9999px", // pill shape
    textTransform: "none",
    fontWeight: 600,
    px: 3,
    py: 1.2,
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
  };

  return (
<header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-md sticky top-0 z-50 w-full
  px-4 py-3 sm:px-6 sm:py-4
  ">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wide">
          <Link href="/" className="hover:text-yellow-300 transition-colors duration-300">
            BlogIn 🚀
          </Link>
        </h1>

        {/* Navigation Links */}
        <nav className="space-x-6 text-lg font-medium flex items-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`hover:text-yellow-300 transition duration-300 ${
                router.pathname === item.path ? "underline" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}

          {/* Auth Buttons */}
          {session && session.user ? (
            <>
             {email && (
    <Link href="/PersonalData" className="mr-4 font-semibold text-yellow-300 truncate max-w-xs">
    {email}
  </Link>
)}

              <Button
                onClick={handleLogout}
                variant="contained"
                sx={{
                  ...buttonStyles,
                  backgroundColor: "#1e40af", // cool blue
                  "&:hover": { backgroundColor: "#1e3a8a", boxShadow: "0 6px 12px rgba(30, 64, 175, 0.6)" },
                }}
              >
                Dil
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => router.push("/sign-up")}
                variant="contained"
                sx={{
                  ...buttonStyles,
                  backgroundColor: "#2563eb",
                  "&:hover": { backgroundColor: "#1d4ed8", boxShadow: "0 6px 12px rgba(37, 99, 235, 0.6)" },
                }}
              >
                Regjistrohu
              </Button>
              <Button
                onClick={() => router.push("/sign-in")}
                variant="outlined"
                sx={{
                  ...buttonStyles,
                  color: "#2563eb",
                  borderColor: "#2563eb",
                  ml: 2,
                  "&:hover": {
                    backgroundColor: "#2563eb",
                    color: "white",
                    borderColor: "#2563eb",
                    boxShadow: "0 6px 12px rgba(37, 99, 235, 0.6)",
                  },
                }}
              >
                Kyçu
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
