const Course = require('../../models/courseModel')
const CourseStudent = require('../../models/courseStudent');
const User = require('../../models/userModel');

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
        const studentCourses = await CourseStudent.findAll();
        courses.forEach(course => {
            const coursesOfUsers = []; 
            studentCourses.forEach(studentCourse => {
                if (course.course_id === studentCourse.course_id) {
                    const user = users.find(user => user.user_id === studentCourse.user_id);
                    if (user) {
                        coursesOfUsers.push(user);
                    }
                }
            });
            coursesWithUsers.push({
                course,
                users: coursesOfUsers
            });
        });
        if (coursesWithUsers) {
            return coursesWithUsers;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error al obtener cursos y usuarios:', error);
        throw error;
    }
}