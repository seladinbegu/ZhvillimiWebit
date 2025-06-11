import NextAuth, {
  NextAuthOptions,
  Account,
  Profile,
  User as NextAuthUser,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { getUser } from "@/api/services/User";
import { compare } from "bcryptjs";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await getUser(credentials?.email!);
        if (!user) throw new Error("Email nuk ekziston");

        const isValid = await compare(credentials!.password, user.password);
        if (!isValid) throw new Error("Fjalekalimi nuk eshte i sakte");

        return {
          id: user._id.toString(),
          email: user.email,
          emailVerified: user.emailVerified ?? null,
          name: user.name,
          password: user.password,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const client = await clientPromise; // Use the existing connection
          const db = client.db();

          const existingUser = await db
            .collection("users")
            .findOne({ email: user.email });

          if (!existingUser) {
            // User doesn't exist yet, NextAuth will auto-create user.
            return true;
          }

          // Normalize userId to string
          const userIdString = existingUser._id.toString();

          const linkedAccount = await db
            .collection("accounts")
            .findOne({ userId: userIdString, provider: "google" });

          if (!linkedAccount) {
            // Auto-link the Google OAuth account for existing user
            await db.collection("accounts").insertOne({
              userId: userIdString,
              provider: "google",
              providerAccountId: account.providerAccountId,
              type: account.type,
              access_token: account.access_token,
              refresh_token: account.refresh_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
              session_state: account.session_state,
            });
          }

          return true;
        } catch (err) {
          console.error("Error in signIn callback:", err);
          return false;
        }
        // No need to close the client when using clientPromise
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        // session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in", // redirect error (OAuthAccountNotLinked) to sign-in
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
