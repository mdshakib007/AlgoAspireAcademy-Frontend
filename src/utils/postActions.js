import toast from "react-hot-toast";
import api from "../api/axiosInstance";

export const handleVote = async (postId) => {
    try {
        const voteRes = await api.post('/api/discussion/toggle-vote/', { post: postId });
        toast.success("vote added");
        console.log(voteRes.response);
    }
    catch (err) {
        console.error(err)
        toast.error("Unexpected error occurred");
    }
};

export const handleComment = async (postId, body) => {
    try {
        const commentRes = await api.post('/api/discussion/comment/create/', { post: postId, content: body });
        toast.success("Comment added successfully");
        return commentRes.response;
    }
    catch{
        toast.error("An error occurred");
    }
};

export const copyLink = async (url) => {
    try {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
    } catch (error) {
        console.error("Failed to copy link:", error);
        toast.error("Failed to copy link");
    }
};