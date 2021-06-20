import Post from '../models/Post';
import axios from 'axios';
import User from '../models/User';

const BASE = 'http://gateway:8000';

const banUser = async (post: Post) => {
  await axios.post(`${BASE}/api/users/ban/${post.user.id}`);
};

const approveUser = async (user: User) => {
  await axios.post(`${BASE}/api/users/approve/${user.id}`);
};

export default { banUser, approveUser };
