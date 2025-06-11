import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const adminEmails = [
  "beguseladin@gmail.com",
  "albanpasoma@gmail.com",
  "tefikujkani@gmail.com",
  "arlindkurti@gmail.com",
  "shqipronmusliu@gmail.com",
];

export default function AuthListener() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      const email = session.user.email;
      localStorage.setItem("email", email);
      localStorage.setItem(
        "role",
        adminEmails.includes(email) ? "admin" : "user"
      );
      router.push("/");
    }
  }, [status, session, router]);

  return null;
}
