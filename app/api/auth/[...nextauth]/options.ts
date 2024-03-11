import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthOptions } from "next-auth";

interface Credentials {
  username: string;
  password: string;
}

export const options: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter your username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        const { username, password } = credentials as Credentials;
        if (
          username == process.env.NEXT_AUTH_USERNAME &&
          password == process.env.NEXT_AUTH_PASSWORD
        ) {
          return { id: "1", name: "Admin", email: username };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.expires = new Date(Date.now() + 3600 * 1000).toISOString();
      return session;
    },
  },
};
