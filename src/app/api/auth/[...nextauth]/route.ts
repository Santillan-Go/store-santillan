import CredentialProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";
import { authOptions } from "@/lib/authOptions";
// export const authOptions: AuthOptions = {
//   providers: [
//     CredentialProvider({
//       name: "Credentials",
//       credentials: {
//         name: { type: "text", placeholder: "enter your name" },
//         password: { type: "password", placeholder: "enter your password" },
//       },
//       authorize: async (credentials) => {
//         const { name, password }: any = credentials;

//         try {
//           const res = await fetch(`${process.env.BASE_URL}/api/auth/verify`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ name, password }),
//           });

//           const json = await res.json();

//           if (json.error && !res.ok) {
//             throw new Error(json.message);
//           }

//           return {
//             name,
//             id: json.id,
//           };
//           ///checking the password
//         } catch (error: any) {
//           throw new Error(error.message);
//         }
//         //FIND USER
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//   },

//   jwt: {
//     secret: process.env.JWT_SECRET, // Secret to sign the JWT
//   },
//   callbacks: {
//     async jwt(params) {
//       const { user, token } = params;
//       try {
//         if (user) {
//           token.id = user.id;
//           token.email = user.email;
//         }
//         console.log(token, "TOKEN");
//         return token;
//       } catch (error) {
//         return {};
//       }
//       // Add user information to the token
//     },
//     async session(params) {
//       const { user, token, session }: { user: any; token: any; session: any } =
//         params;

//       try {
//         // Add token information to the session
//         if (session.user) {
//           session.user.id = token.id;
//         }
//         console.log(session, "SESSION");
//         return session;
//       } catch (error) {
//         return null;
//       }
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

/*
  jwt: {
    // async encode(params: JWTEncodeParams): Promise<string> {
    //   // HOW TO GET DATA OR HOW TO USE THIS
    //   console.log(params.token, "FROM JWT");
    //   console.log(params.token), "TOKEN FROM JWT";
    //   // return a custom encoded JWT string
    //   return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    // },
    // async decode(params: JWTDecodeParams): Promise<JWT | null> {
    //   // return a `JWT` object, or `null` if decoding failed
    //   console.log(params.token);
    //   console.log(params.secret);
    //   return null;
    // },
  },

  callbacks: {
    async jwt(params) {
      const { user, token } = params;
      console.log(user, "FROM JWT CB");
      if (user) {
        token.id = user.id;
      }
      return token;
      // Add user information to the token
      // if (user) {
      //   token.id = user.id;
      //   token.email = user.email;
      // }
      // return token;
    },
    async session(params) {
      const { token, session, user }: { token: any; session: any; user: any } =
        params;

      //Add token information to the session
      if (user && session.user && session.user.id) {
        session.user.id = token.id;
        session.user.email = token.email;
      }
      return session;
    },
  },
*/
