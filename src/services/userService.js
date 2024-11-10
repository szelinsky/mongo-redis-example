const User = require("../models/user");
const Comment = require("../models/comment");
const client = require("../redisClient");

const createUser = async (data) => {
  const user = new User(data);
  return await user.save();
};

const createComment = async (data) => {
  const comment = new Comment(data);
  return await comment.save();
};

const getUserComments = async (userId) => {
  const cacheKey = `user_comments:${userId}`;
  const cachedComments = await client.get(cacheKey);
  if (cachedComments) {
    return JSON.parse(cachedComments);
  }
  const comments = await Comment.find({ userId }).populate("userId");
  await client.set(cacheKey, JSON.stringify(comments), { EX: 3600 });
  return comments;
};

const getUser = async (userId) => {
  const cacheKey = `user:${userId}`;
  const cachedUser = await client.get(cacheKey);
  if (cachedUser) {
    return JSON.parse(cachedUser);
  }
  const user = await User.findById(userId);
  if (user) {
    await client.set(cacheKey, JSON.stringify(user), { EX: 3600 });
  }
  return user;
}

module.exports = {
  createUser,
  createComment,
  getUserComments,
  getUser
};
