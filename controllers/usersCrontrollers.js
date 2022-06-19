const usersService = require('../services/')

const findAll = async (_req, res) => {
  const result = usersService.findAll();
  res.status(200).json(result);
};

const findByEmail = async (req, res) => {
  const { email } = req.query;
  const result = await usersService.findByEmail(email);
  res.status(200).json(result);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const result = await usersService.findById(id);
  res.status(200).json(result);
};

const create = async (req, res) => {
  const newUser = req.body;
  const result = usersService.createUser(newUser);
  res.status(201).json(result);
};


const update = async (req, res) => {

};

const deleteOne = async (req, res) => {

};

const deleteAll = async (req, res) => {

};

module.exports = {
  create,
  findAll,
  findById,
  update,
  deleteOne,
  deleteAll,
};
