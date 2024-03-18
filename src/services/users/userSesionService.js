const AppSession = require("../../models/appSessionModel")
const User = require('../../models/userModel');
const getInactiveUsers = async () => {
    try {
      const inactiveUsers = await User.findAll({
        where: {
          last_login: null // Usuarios que nunca han iniciado sesión
        }
      });
      return inactiveUsers;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  const getActiveUsers = async () => {
    try {
      const activeUsers = await User.findAll({
        where: {
          last_login: {
            [Op.not]: null // Usuarios que han iniciado sesión al menos una vez
          }
        },
        order: [['last_login', 'DESC']], // Ordenar por última vez que iniciaron sesión
        limit: 5 // Obtener los 5 usuarios que más usan la aplicación
      });
      return activeUsers;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  module.exports = { getInactiveUsers, getActiveUsers };
  