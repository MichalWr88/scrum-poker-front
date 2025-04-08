import NextAuth, { DefaultSession } from "next-auth";
import GoogleAuth from "next-auth/providers/google";
import UserModel from "./src/services/mongodb/user/UserSchema";

declare module "next-auth" {
  interface Session {
    user: {
      role?: string;
      dbId?: unknown;
      createdAt?: Date;
    } & DefaultSession["user"];
  }
  interface User {
    dbId: unknown;
    role: string;
    createdAt: Date;
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth(() => {
  return {
    // Use JWT sessions
    session: {
      strategy: "jwt",
    },
    providers: [
      GoogleAuth({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ],
    callbacks: {
      // The jwt callback is called whenever a token is created (or updated).
      async jwt({ token, user }) {
        // On initial sign in, user object is available
        if (user) {
          token.role = user.role;
          token.dbId = user.dbId;
          token.createdAt = user.createdAt;
        }
        return token;
      },
      // The session callback is called whenever a session is checked.
      async session({ session, token }) {
        if (session.user) {
          const dbUser = await UserModel.findOne({ email: session.user.email });
          if (dbUser) {
            session.user.role = dbUser.role as string;
          } else {
            session.user.role = token.role as string;
          }
          session.user.dbId = token.dbId;
          session.user.createdAt = token.createdAt as Date;
        }
        console.log("session2", session);
        return session;
      },
      async signIn({ user }) {
        if (user?.email) {
          const validatedEmails = ["maleszewski.geo@gmail.com"];
          const validatedDomains = ["trans.eu", "rst.com.pl"];
          const userDomain = user.email.split("@")[1];
          if (
            validatedEmails.includes(user.email) ||
            validatedDomains.includes(userDomain)
          ) {
            // Check if user exists in our db.
            const dbUser = await UserModel.findOne({ email: user.email });
            console.log("dbUser", dbUser);
            if (dbUser) {
              // Enrich user object with db properties.
              user.role = dbUser.role;
              user.dbId = dbUser._id;
              user.createdAt = dbUser.createdAt;
            } else {
              const newUser = await UserModel.create({
                name: user.name,
                email: user.email,
                role: "developer",
              });
              user.role = newUser.role;
              user.dbId = newUser._id;
              user.createdAt = newUser.createdAt;
            }
            console.log("33333", user);
            return true;
          }
        }
        console.log("false", user);
        return false;
      },
      // async redirect({ url, baseUrl }) {
      //   if (url.startsWith(baseUrl)) return url;
      //   if (url.includes("error="))
      //     return `${baseUrl}/auth-error${
      //       url.split("?")[1] ? "?" + url.split("?")[1] : ""
      //     }`;
      //   return baseUrl;
      // },
    },
    pages: {
      error: "/auth-error",
      signIn: "/auth/signin",
    },
  };
});
