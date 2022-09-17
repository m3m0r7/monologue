import NextAuth from 'next-auth'
import GoogleProvider from "next-auth/providers/google";

export const authOptions ={
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    //jwtが作成・更新された時に呼ばれる
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    //セッションがチェックされた時に呼ばれる
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
}

export default NextAuth(authOptions)
