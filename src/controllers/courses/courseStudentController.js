const CourseStudent = require('../../models/courseStudent');
const Course = require('../../models/courseModel');
const courseStudentService = require('../../services/courses/courseStudentService');
const userService = require('../../services/users/userService');
const User = require('../../models/userModel');
const Module = require('../../models/moduleModel');


// Create a new coursestudent
exports.createCourseStudent = async (req, res) => {
  try {
    const courseStudent = await CourseStudent.create(req.body);
    res.json(courseStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create course student' });
  }
};


// Get all coursestudents with associated user and course details
exports.getAllCourseStudents = async (req, res) => {
  try {
    const courseStudents = await CourseStudent.findAll({
      include: [
        { model: Course, attributes: ['course_id', 'name', 'image'] },
        { model: User, attributes: ['email'] },
      ],
    });
    res.json(courseStudents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve course students' });
  }
};


exports.getAllCourseStudentsByCourseId = async (req, res) => {
  try {
    const course_id = req.params.course_id;

    const courseStudents = await courseStudentService.getAllCourseStudentsByCourseId(course_id);

    res.json(courseStudents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve course students' });
  }
};


// Get course students by user_id
exports.getCourseStudentsByUserId = async (req, res) => {
  const { user_id } = req.params;

  try {
    const courseStudents = await courseStudentService.getCourseStudentsByUserId(user_id);
    res.json(courseStudents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve course students by user_id' });
  }
};


exports.getAllCourseStudentsWithDetails = async (req, res) => {
  try {
    const { course_id } = req.params;
    const courseStudents = await userService.getAllCourseStudentsWithDetails(course_id);
    res.json(courseStudents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve course students with details' });
  }
}



exports.postCourseStudents = async (req, res) => {
  try {
    console.log(req.body);
    const { course_student_list } = req.body;
    if (!Array.isArray(course_student_list)) throw new Error('Invalid request');
    const courseStudents = await Promise.all(course_student_list.map(async (course_student) => {
      await courseStudentService.saveCourseStudent(course_student);
    }));

    if (courseStudents) {
      res.status(200).json({ message: 'Estudiantes agregados satisfactoriamente' });
    } else {
      throw new Error('Los estudiantes no fueron agregados');
    };
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
}



exports.updateCourseStudent = async (req, res) => {
  const { id } = req.params;
  const courseStudentData = req.body;

  try {
    const updatedCourseStudent = await courseStudentService.updateCourseStudentById(id, courseStudentData);
    if (updatedCourseStudent[0] === 0) {
      res.status(404).json({ error: 'No CourseStudent found with this id' });
    } else {
      res.json(updatedCourseStudent);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update course student' });
  }
};