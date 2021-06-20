import Post from '../models/Post';
import axios from 'axios';

const BASE = 'http://gateway:8000';

const removePost = async (post: Post) => {
  await axios.post(`${BASE}/api/posts/remove/${post.id}`);
};

export default { removePost };
