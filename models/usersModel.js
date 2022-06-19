module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define('Users', {
    id: {
      type: Sequelize.NUMBER,
    },
    is_active: {
      type: Sequelize.BOOLEAN,
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    user_password: {
      type: Sequelize.STRING,
    }
  });
  return Users;
};
