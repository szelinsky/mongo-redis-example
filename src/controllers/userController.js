const userService = require("../services/userService");

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createComment = async (req, res) => {
  try {
    const comment = await userService.createComment(req.body);
    res.status(201).send(comment);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUserComments = async (req, res) => {
  try {
    const comments = await userService.getUserComments(req.params.id);
    res.status(200).send(comments);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUser1 = async (req, res) => {
  // res.send(req.params.id);
  try {
    const user = await userService.getUser(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  createUser,
  createComment,
  getUserComments,
  getUser1,
};
