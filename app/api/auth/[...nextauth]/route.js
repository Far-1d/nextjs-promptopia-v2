import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { connectToDB } from '@/utils/database';
import User from '@/models/user';


const handler = NextAuth({
    providers : [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        })
    ],
    
    callbacks: {
        async session({session}) {
            console.log("--------====654=====---------");
            const sessionUser = await User.findOne({
                email: session.user.email
            })

            session.user.id = sessionUser._id.toString();
            
            return session;
        },

        async signIn({profile}) {
            try {
                console.log("--------=========---------");
                await connectToDB();
                
                console.log(profile);
                console.log('user is:::: ', profile.name.replace(" ","_").toLowerCase() || 
                profile.login.replace(" ", '_').toLowerCase())
                // check if a user already exit
                const userExists = await User.findOne({
                    email: profile.email
                })

                // if not create user
                if (!userExists){
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ","_").toLowerCase() || 
                                    profile.login.replace(" ", '_').toLowerCase(),
                        image: profile.picture || profile.avatar_url
                    })
                }
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
    }
})


export { handler as GET, handler as POST}
// export default NextAuth(handler)
