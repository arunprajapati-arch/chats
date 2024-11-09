import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import db from "@/db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any): Promise<any> {
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        try{
            const existingUser = await db.user.findFirst({
                where: {
                    username: credentials.username
                }
            });
        

        
           
          
            
            if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.username,
                    }
                }
                return null;
            }
        } catch(e){
            console.error(e);
        }

            try {
                const user = await db.user.create({
                    data: {
                        username: credentials.username,
                        password: hashedPassword
                    }
                });
            
                return {
                    id: user.id.toString(),
                    name: user.username,
                }
            } catch(e) {
                console.error(e);
            }

            return null
          },
        })
    ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString(); // Convert ObjectId to string
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      
      
      if (token) {
       
        
        session.user._id = token.sub;
        session.user.username = token.username;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
 
};