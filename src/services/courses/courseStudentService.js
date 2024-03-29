
const CourseStudent = require('../../models/courseStudent');
const User = require('../../models/userModel');
const Course = require('../../models/courseModel');
const Module = require('../../models/moduleModel');
const Evaluation = require('../../models/evaluationModel');
const EvaluationResult = require('../../models/evaluationResultModel');

exports.getAllCourseStudents = async () => {
  try {
    const courseStudents = await CourseStudent.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Course,
          attributes: ['name', 'image_url'],
        },
      ],
    });
    return courseStudents
  } catch (error) {
    console.log(error)
    throw error;
  }
};



// Get course students by user_id
exports.getCourseStudentsByUserId = async (user_id) => {
  try {
    const coursesByStudent = await CourseStudent.findAll({
      where: { user_id: user_id },
      include: [
        {
          model: Course,
          attributes: ['course_id', 'name', 'image'],
        },
      ],
    });
    return coursesByStudent
  } catch (error) {
    console.log(error)
    throw error;
  }
};


exports.getAllCourseStudentsByCourseId = async (course_id) => {
  try {
    const courseStudents = await Course.findAll({
      where: { course_id },
      include: [
        {
          model: Module,
          as: 'modules',
          attributes: [
            'is_active',
            'created_at',
            'name'
          ],
          include: [
            {
              model: Evaluation,
              attributes: [
                'note',
                'name'
              ],
              include: [{
                model: EvaluationResult,
                attributes: ['note']
              }]
            }
          ]
        },
      ],
    });

    return courseStudents;
  } catch (error) {
    console.log(error)
    throw error;
  }
}

exports.saveCourseStudent = async (course_student) => {
  try {
    const courseStudent = await CourseStudent.create(course_student);
    return courseStudent;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


exports.updateCourseStudentById = async (id, courseStudentData) => {
  try {
    const courseStudent = await CourseStudent.update(courseStudentData, {
      where: { id: id }
    });
    if (courseStudent[0] === 0) {
      throw new Error('No CourseStudent found with this id');
    }
    return courseStudent;
  } catch (error) {
    console.error(error);
    throw error;
  }
};