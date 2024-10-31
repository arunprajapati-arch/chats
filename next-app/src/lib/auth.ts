import db from "@/db";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            username: { label: "Username", type: "text", placeholder: "john123" },
            password: { label: "Password", type: "password" }
          },
          // TODO: User credentials type from next-auth
          async authorize(credentials: any) {
            // Do zod validation
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
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
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        // fix the type here? Using any is bad
        async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        }
    }
  }
 