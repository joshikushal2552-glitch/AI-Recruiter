import { NextAuthOptions, User as AuthUser, Account } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import db from '@/lib/db'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID || '',
      clientSecret: process.env.AUTH_GOOGLE_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'you@example.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing input credentials fields.')
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !user.password) {
          throw new Error('Invalid account user or target password profile matrix.')
        }

        const isValid = user.password === credentials.password

        if (!isValid) {
          throw new Error('Access denied. Invalid password.')
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }: { user: AuthUser; account: Account | null }) {
      if (!user.email) return false

      const existingUser = await db.user.findUnique({
        where: { email: user.email }
      })

      if (!existingUser) {
        await db.user.create({
          data: {
            email: user.email,
            name: user.name || '',
            image: user.image || '',
          }
        })
      }
      return true
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },
    async jwt({ token, user }: { token: JWT; user?: AuthUser }) {
      if (user) {
        token.sub = user.id
      }
      return token
    }
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.AUTH_SECRET,
}
