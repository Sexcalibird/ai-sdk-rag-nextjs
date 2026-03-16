import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        madiemdung: { label: "Mã khách hàng", type: "text" },
        matkhau: { label: "Mật khẩu", type: "text" },
      },
      async authorize(credentials, req) {
        if (!credentials?.madiemdung || !credentials?.matkhau) {
          return null
        }
        const res = await fetch(process.env.CNHP_URL + "/User/login", {
          method: "POST",
          body: JSON.stringify({
            ...credentials,
            token_thietbi: ""
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status == 401) {
          console.log(res.statusText);
          return null;
        }
        const user = await res.json();
        return user;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };
      return token;
    },
    async session({ token, session }) {
      session.user = token;
      return session;
    },
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };