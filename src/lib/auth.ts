import { NextAuthOptions, User as AuthUser, Account } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import db from '@/lib/db'

const isProduction = process.env.NODE_ENV === 'production'
const googleClientId = process.env.AUTH_GOOGLE_ID
const googleClientSecret = process.env.AUTH_GOOGLE_SECRET

const googleProvider = googleClientId && googleClientSecret
  ? GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    })
  : null

export const authOptions: NextAuthOptions = {
  providers: [
    ...(googleProvider ? [googleProvider] : []),
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

        try {
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
        } catch (error) {
          console.error('Credentials auth failed:', error)
          throw new Error('Database connection failed or credentials could not be verified.')
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user }: { user: AuthUser }) {
      if (!user.email) return false

      try {
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
      } catch (error) {
        console.error('Auth database sync failed:', error)
        return false
      }
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
  secret: process.env.AUTH_SECRET || 'development-secret',
  useSecureCookies: isProduction,
  logger: {
    error(code, metadata) {
      console.error('NextAuth error:', code, metadata)
    },
    warn(code) {
      console.warn('NextAuth warning:', code)
    },
    debug(code, metadata) {
      console.debug('NextAuth debug:', code, metadata)
    },
  },
  cookies: {
    sessionToken: {
      name: `${isProduction ? '__Secure-' : ''}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: isProduction,
      },
    },
  },
  theme: {
    colorScheme: 'auto',
  },
  debug: !isProduction,
}
