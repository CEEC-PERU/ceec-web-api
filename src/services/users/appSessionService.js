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


// Definición de la función getSessionStatisticsbyUser
// Esta función es asincrónica, lo que significa que devuelve una promesa
const getSessionStatisticsByUser = async ({ startDate, endDate, userId }) => {
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
                user_id: userId, // Filtrar por userId
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


const findUsersWithoutSessions = async () => {
    try {
        const usersWithoutSessions = await User.findAll({
            include: [{
                model: AppSession,
                required: false // Para incluir usuarios sin sesiones
            }],
            where: {
                '$AppSessions.id$': null // Filtrar usuarios sin sesiones
            }
        });

        return usersWithoutSessions;
    } catch (error) {
        console.error('Error al buscar usuarios sin sesiones:', error);
        throw error;
    }
};

const findLastLoginDate = async (userId) => {
    try {
        const lastSession = await AppSession.findOne({
            where: { user_id: userId },
            order: [['start_time', 'DESC']] // Ordenar por la sesión más reciente
        });

        return lastSession ? lastSession.start_time : null;
    } catch (error) {
        console.error('Error al buscar última sesión de usuario:', error);
        throw error;
    }
};
module.exports = { createAppSessionService, getSessionStatisticsByUser , getSessionStatistics, findLastLoginDate, findUsersWithoutSessions };