const userService = require("../../services/users/userSesionService");

const getUserSummary = async (req, res) => {
  try {
    const inactiveUsers = await userService.getInactiveUsers();
    const activeUsers = await userService.getActiveUsers();

    res.status(200).json({
      inactiveUsers: inactiveUsers.length,
      lastLogin: activeUsers[0] ? activeUsers[0].last_login : null,
      mostActiveUsers: activeUsers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

module.exports = { getUserSummary };