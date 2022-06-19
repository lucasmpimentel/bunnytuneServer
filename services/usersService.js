const CustomError = require('../utils/CustomError');
const db = require('../models/connection');
const Users = db.users;
const Op = db.Sequelize.Op;

const code500msg = 'Erro ao sincronizar o banco de dados';

const findAll = async () => {
  try{
    const users = await Users.findAll();
    return users;
  } catch (error) {
    throw new CustomError(500, code500msg)
  }
};

const findByEmail = async (email) => {
  try {
    const condition = { email: { [Op.eq]: email}};
    const result = await Users.findAll({where: condition});
    if (result.length === 0) throw new CustomError(404, 'Email não encontrado');
    return result;
  } catch (error) {
    console.log(error)
    throw new CustomError(error.status, error.message);
  }
};

const findById = async (id) => {
  try {
    const result = await Users.findByPk(id);
    if (!result) throw new CustomError(404, 'Usuário não encontrado')
    return result;
  } catch (error) {
    throw new CustomError(error.status, error.message);
  }
};

const createUser = async (newUser) => {
  try {
  if (!newUser) throw new CustomError(400, 'Conteúdo não pode ser vazio');
  const newUserSerialize = {
    is_active: newUser.isActive,
    name: newUser.name,
    email: newUser.email,
    user_password: newUser.userPassword,
  };
    const result = await Users.create(newUserSerialize);
    return result;
  } catch (error) {
    throw new CustomError(error.status, error.message);
  }
};

const update = async (id, updateData) => {
  const [result] = await Users.update(updateData, {where: { id }});
  if (result === 1) return { message: "Atualizado com sucesso"};
  return result;
};

const deleteOne = async (id) => {
  const [result] = await Users.destroy({ where: { id }})
  result === 1 ? { message: "Apagado!"} : { message: "Erro no database: Não apagado"}
};

module.exports = {
  createUser,
  findAll,
  findByEmail,
  findById,
  update,
  deleteOne,
};
