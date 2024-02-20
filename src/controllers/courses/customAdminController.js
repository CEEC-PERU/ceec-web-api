const customCourseModule = require('../../services/courses/customAdminService')

exports.getCoursesModules = async (req, res) => {
    try {
        const courseModules = await customCourseModule.getCoursesModules();
        res.json(courseModules)
    } catch (error) {
        console.error('Error fetching courses and modules:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getCoursesByUser = async (req, res) => {
    const user_id = req.params.id;
    try {
        const userCourses = await customCourseModule.getCoursesByUser(user_id);
        res.json(userCourses)
    } catch (error) {
        console.error('Error fetching courses and modules:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getCoursesAndUsers = async (req, res) => {
    try {
        const coursesAndUsers = await customCourseModule.getCoursesAndUsers();
        res.json(coursesAndUsers)
    } catch (error) {
        console.error('Error fetching courses and users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}