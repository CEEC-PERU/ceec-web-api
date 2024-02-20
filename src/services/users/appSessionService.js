const AppSession = require("../../models/appSessionModel")

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


module.exports = { createAppSessionService, getSessionStatistics }