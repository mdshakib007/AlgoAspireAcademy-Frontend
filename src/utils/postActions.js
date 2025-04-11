import toast from "react-hot-toast";
import api from "../api/axiosInstance";


// Toggle vote (upvote/downvote) on a discussion post
export const handleVote = async (postId) => {
    try {
        const voteRes = await api.post('/api/discussion/toggle-vote/', { post: postId });
        return voteRes.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

// Post a new comment to a discussion post
export const handleComment = async (postId, body) => {
    try {
        const commentRes = await api.post('/api/discussion/comment/create/', { post: postId, content: body });
        return commentRes.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

// Fetch all comments(paginated)
export const fetchCommentList = async (postId) => {
    try {
        const commentList = await api.get(`/api/discussion/comment/list/?post_id=${postId}&paginated=false`);
        return commentList.data;
    }
    catch (err) {
        console.error(err)
        throw err;
    }
};

// Copy a given URL to the clipboard
export const copyLink = async (url) => {
    try {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
    } catch (error) {
        console.error("Failed to copy link:", error);
        toast.error("Failed to copy link");
    }
};