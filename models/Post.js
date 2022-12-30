import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    email: { type: String, required: true, trim: true }
});
const Post = mongoose.model('Post', postSchema);

export default Post
// module.exports = mongoose.model("Post", postSchema);



