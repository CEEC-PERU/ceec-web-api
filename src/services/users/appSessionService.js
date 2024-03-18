const AppSession = require("../../models/appSessionModel")
const User = require('../../models/userModel');

const { Op } = require('sequelize');

const createAppSessionService = async (appSession) => {
    try {
        const newAppSession = await AppSession.create(appSession);
        return newAppSession;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


const getSessionStatistics = async ({ startDate, endDate }) => {
    try {
        const sessions = await AppSession.findAll({
            attributes: [
                [
                    AppSession.sequelize.fn(
                        'date_trunc',
                        'day',
                        AppSession.sequelize.col('start_time')
                    ),
                    'session_day'
                ],
                [AppSession.sequelize.fn('COUNT', AppSession.sequelize.col('appsession_id')), 'sessions'],
                [
                    AppSession.sequelize.fn(
                        'AVG',
                        AppSession.sequelize.literal(
                            'EXTRACT(EPOCH FROM ("end_time" - "start_time"))'
                        )
                    ),
                    'average_duration_seconds'
                ],
            ],
            group: ['session_day'],
            where: {
                start_time: {
                    [Op.between]: [startDate, endDate],
                },
            },
            order: [[AppSession.sequelize.literal('session_day'), 'DESC']],
            raw: true,
        });
        return sessions;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getLastLogin = async (userId) => {
    try {
        const lastSession = await AppSession.findOne({
            where: {
                user_id: userId,
            },
            order: [['start_time', 'DESC']],
        });
        return lastSession ? lastSession.start_time : null;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getInactiveUsers = async () => {
    try {
        const activeUserIds = await AppSession.findAll({
            attributes: ['user_id'],
            group: ['user_id']
        });
        const inactiveUsers = await User.findAll({
            where: {
                user_id: {
                    [Op.notIn]: activeUserIds.map(activeUser => activeUser.user_id)
                }
            }
        });
        return inactiveUsers;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getUsersActivityCount = async (date) => {
    try {
        const startOfDay = subDays(date, 1);
        const endOfDay = new Date(date);
        const activityCounts = await AppSession.count({
            where: {
                start_time: {
                    [Op.between]: [startOfDay, endOfDay]
                }
            },
            attributes: ['user_id'],
            group: ['user_id']
        });
        return activityCounts;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = { createAppSessionService, getSessionStatistics, getLastLogin, getInactiveUsers, getUsersActivityCount };