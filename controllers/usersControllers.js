const usersService = require('../services/usersService');

const findAll = async (req, res) => {
  const { email } = req.query;
  let result
  if (email) {
    result = await usersService.findByEmail(email)
  } else {
    result = await usersService.findAll();
  }
  res.status(200).json(result);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const result = await usersService.findById(id);
  res.status(200).json(result);
};

const create = async (req, res) => {
  const newUser = req.body;
  await usersService.createUser(newUser);
  res.status(201).json({message: 'Cadastro bem sucedido'});
};


const update = async (req, res) => {
  const userUpdate = req.body;
  const { id } = req.params;
  const result = await usersService.update(id, userUpdate);
  res.status(200).json(result);
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  const result = await usersService.deleteOne(id);
  res.status(204).json(result);
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  deleteOne,
};
