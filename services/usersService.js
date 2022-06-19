const CustomError = require('../utils/CustomError');
const db = require('../models/connection');
const Users = db.users;
const Op = db.Sequelize.Op;

const code500msg = 'Erro ao criar entrada no database';

const findAll = async () => {
  try{
    const result = await Users.findAll();
    return result;
  } catch (error) {
    throw new CustomError(500, code500msg)
  }
};

const findByEmail = async (email) => {
  try {
    const condition = { email: { [Op.eq]: email}};
    const result = Users.findAll({where: condition});
    if (result.length === 0) throw new CustomError(404, 'email não encontrado');
    return result;
  } catch (error) {
    throw new CustomError(500, code500msg);
  }
};

const findById = async (id) => {
  try {
    const result = await Users.findByPk(id);
    return result;
  } catch (error) {
    throw new CustomError(500, code500msg);
  }
};

const createUser = async (newUser) => {
  if (!newUser) throw new CustomError(400, 'Conteúdo não pode ser vazio');
  const users = await findAll();
  const checkEmail = users.filter((user) => user.email === newUser.email);
  if (checkEmail.length > 0) return CustomError()
  const newUserSerialize = {
    is_active: newUser.isActive,
    name: newUser.name,
    email: newUser.email,
    user_password: newUser.userPassword,
  };
  try {
    const result = await Users.create(newUserSerialize);
    return result;
  } catch (error) {
    throw new CustomError(500, code500msg);
  }
};

module.exports = {
  createUser,
  findAll,
  findByEmail,
  findById,
  update,
  deleteOne,
};
