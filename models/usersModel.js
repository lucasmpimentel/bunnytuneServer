module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define('Users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    user_password: {
      type: Sequelize.STRING,
    },
  });
  return Users;
};
