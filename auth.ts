import NextAuth from "next-auth";
import GoogleAuth from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth(() => {
  return {
    providers: [
      GoogleAuth({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ],
    callbacks: {
      async signIn({ user }) {
        if (user?.email) {
          const validatedEmails = ["maleszewski.geo@gmail.com"];
          const validatedDomains = ["trans.eu", "rst.com.pl"];
          const userDomain = user.email.split("@")[1];
          if (
            validatedEmails.includes(user.email) ||
            validatedDomains.includes(userDomain)
          ) {
            return true;
          }
        }
        return false;
      },
      async redirect({ url, baseUrl }) {
        if (url.startsWith(baseUrl)) return url;
        if (url.includes("error="))
          return `${baseUrl}/auth-error${
            url.split("?")[1] ? "?" + url.split("?")[1] : ""
          }`;
        return baseUrl;
      },
    },
    pages: {
      error: "/auth-error", // Error code passed in query string as ?error=
      signIn: "/auth/signin", // Customize the sign in page if needed.
    },
  };
});
