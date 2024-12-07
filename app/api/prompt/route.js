import { connectToDB } from '@/utils/database';
import Prompt from '@/models/prompt';
import User from '@/models/user';


export const GET = async (request) => {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query');
    console.log('sealcj: : ', query)
    try {
        await connectToDB();
        let prompts = []
        if (query != null) {
            const users = await User.find({ username: { $regex: query, $options: 'i' } });
            const userIds = users.map(user => user._id);
    
            prompts = await Prompt.find({ 
                $or: [
                    { prompt: { $regex: query, $options: 'i' } },
                    { tag: { $regex: query, $options: 'i' } },
                    { creator: { $in: userIds } }
                  ]
             }).populate('creator');
        } else {
            prompts = await Prompt.find({}).populate('creator');
        } 

        return new Response(JSON.stringify(prompts), {status:200});
    } catch (error) {
        console.log("error happended", error)
        return new Response(error, {status:500});
    }
}