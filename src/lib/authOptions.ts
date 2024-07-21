import { AuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
export const authOptions: AuthOptions = {
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        name: { type: "text", placeholder: "enter your name" },
        password: { type: "password", placeholder: "enter your password" },
      },
      authorize: async (credentials) => {
        const { name, password }: any = credentials;

        try {
          const res = await fetch(
            `${process.env.NEXTAUTH_URL}/api/auth/verify`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name, password }),
            }
          );

          const json = await res.json();

          if (json.error && !res.ok) {
            throw new Error(json.message);
          }

          return {
            name,
            id: json.id,
          };
          ///checking the password
        } catch (error: any) {
          throw new Error(error.message);
        }
        //FIND USER
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/error",
  },

  jwt: {
    secret: process.env.JWT_SECRET, // Secret to sign the JWT
  },
  callbacks: {
    async jwt(params) {
      const { user, token } = params;
      try {
        if (user) {
          token.id = user.id;
          token.email = user.email;
        }
        console.log(token, "TOKEN");
        return token;
      } catch (error) {
        return {};
      }
      // Add user information to the token
    },
    async session(params) {
      const { user, token, session }: { user: any; token: any; session: any } =
        params;

      try {
        // Add token information to the session
        if (session.user) {
          session.user.id = token.id;
        }
        console.log(session, "SESSION");
        return session;
      } catch (error) {
        return null;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
