const { createAppSessionService, getSessionStatistics  , getInactiveUsers , getLastLogin , getUsersActivityCount, getSessionStatisticsByUser} = require("../../services/users/appSessionService");
const { parseISO, startOfWeek, subWeeks, endOfWeek } = require('date-fns');

const appSessionController = async (req, res) => {
    try {
        const {
            user_id,
            start_time,
            end_time
        } = req.body;
        console.log(req.body);
        const appSession = await createAppSessionService({ user_id, start_time, end_time });
        res.status(200).json(appSession);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}

const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}

const getAppSessions = async (req, res) => {
    try {
        const { page = 0 } = req.query;
        const currentPage = parseInt(page);
        const currentDate = new Date();
        const startDate = startOfWeek(currentDate);
        const startDatePage = subWeeks(startDate, currentPage);
        const endDatePage = endOfWeek(startDatePage);
        const appSessions = await getSessionStatistics({
            startDate: startDatePage,
            endDate: endDatePage,
        });

        const sessionsWithDay = appSessions.map(session => {
            const sessionDate = new Date(session.session_day);
            sessionDate.setDate(sessionDate.getDate() + 1);

            return {
                
                ...session,
                day: sessionDate
                    .toLocaleDateString('es-ES', { weekday: 'long' }).charAt(0).toUpperCase() +
                    sessionDate
                        .toLocaleDateString('es-ES', { weekday: 'long' }).slice(1),
            };
        });

        const startOfWeekDate = startDatePage.toLocaleDateString('es-ES');
        const endOfWeekDate = endDatePage.toLocaleDateString('es-ES');

        const result = {
            sessionsWithDay,
            startOfWeek: startOfWeekDate,
            endOfWeek: endOfWeekDate,
        };
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }

}

// Definición de la función getAppSessionsByUserId
// Esta función es asincrónica, lo que significa que devuelve una promesa
// En el controlador
const getAppSessionsByUser = async (req, res) => {
    try {
        const { page = 0 } = req.query;
        const { userId } = req.params; // Obtener userId de los parámetros de la ruta
        const currentPage = parseInt(page);
        const currentDate = new Date();
        const startDate = startOfWeek(currentDate);
        const startDatePage = subWeeks(startDate, currentPage);
        const endDatePage = endOfWeek(startDatePage);
        const appSessions = await getSessionStatisticsByUser({
            startDate: startDatePage,
            endDate: endDatePage,
            userId, // Pasar userId al servicio
        });
        const sessionsWithDay = appSessions.map(session => {
            const sessionDate = new Date(session.session_day);
            sessionDate.setDate(sessionDate.getDate() + 1);

            return {
                
                ...session,
                day: sessionDate
                    .toLocaleDateString('es-ES', { weekday: 'long' }).charAt(0).toUpperCase() +
                    sessionDate
                        .toLocaleDateString('es-ES', { weekday: 'long' }).slice(1),
            };
        });

        const startOfWeekDate = startDatePage.toLocaleDateString('es-ES');
        const endOfWeekDate = endDatePage.toLocaleDateString('es-ES');

        const result = {
            sessionsWithDay,
            startOfWeek: startOfWeekDate,
            endOfWeek: endOfWeekDate,
        };
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}
const getInactiveUsersController = async (req, res) => {
    try {
        const inactiveUsers = await getInactiveUsers();
        res.status(200).json(inactiveUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}

const getLastLoginController = async (req, res) => {
    try {
        const { userId } = req.params;
        const lastLogin = await getLastLogin(userId);
        res.status(200).json(lastLogin);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}

const getUsersActivityCountController = async (req, res) => {
    try {
        const { date } = req.params;
        const activityCounts = await getUsersActivityCount(new Date(date));
        res.status(200).json(activityCounts);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}

module.exports = { appSessionController, getAppSessionsByUser ,getAppSessions, getInactiveUsersController, getLastLoginController, getUsersActivityCountController };