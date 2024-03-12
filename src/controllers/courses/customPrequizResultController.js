const customPrequizzService = require("../../services/courses/customPrequizzService")

exports.getEvaluationByCourse = async (req, res) => {
    try {
        const course_id = req.params.id
        const evaluation = await customPrequizzService.getEvaluationDataByCourse(course_id)
        res.json(evaluation)
    } catch (error) {
        console.log(error)
        throw error
    }
}

exports.getEvaluationByUserandCourse = async (req, res) => {
    const userId = req.params.userId;
    const courseId = req.params.courseId;
    try {
        const evaluation = await customPrequizzService.getEvaluationDataByUserandCourse(userId ,courseId)
        res.json(evaluation)
    } catch (error) {
        console.log(error)
        throw error
    }
}

exports.getCoursesWithPrequizzResultsByUserController = async (req, res) => {
    try {
        const userId = req.params.userId;
        const coursesWithPrequizzResults = await customPrequizzService.getCourseStudentsWithPrequizzResultsByUser(userId);
        res.status(200).json(coursesWithPrequizzResults);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los cursos y los resultados de Prequizz por user_id' });
    }
}; 