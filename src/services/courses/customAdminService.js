const Course = require('../../models/courseModel')
const User = require('../../models/userModel');
const CampaignCourse = require('../../models/campaignCourse');
const CampaignUser = require('../../models/campaignUser');
exports.getCoursesModules = async () => {
    try {
        const courseModules = await Course.findAll({
            include: 'modules',
        })
        return courseModules;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

exports.getCoursesByUser = async (user_id) => {
    try {
        const user = await User.findByPk(user_id);
        const courses = await user.getCourses();
        console.log("cursos de la funcion: ", JSON.stringify(courses, null, 2));
        if (courses) {
            return courses;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error al obtener cursos del usuario:', error);
        throw error;
    }
}

exports.getCoursesAndUsers = async () => {
    try {
        const coursesWithUsers = []
        const users = await User.findAll();
        const courses = await Course.findAll();
        const campaignUsers = await CampaignUser.findAll();
        
        courses.forEach(course => {
            const usersInCourse = campaignUsers
                .filter(cu => cu.course_id === course.course_id)
                .map(cu => users.find(user => user.user_id === cu.user_id));
            
            coursesWithUsers.push({
                course,
                users: usersInCourse
            });
        });
        
        return coursesWithUsers;
    } catch (error) {
        console.error('Error al obtener cursos y usuarios:', error);
        throw error;
    }
}