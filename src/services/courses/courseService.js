const Course = require('../../models/courseModel');
const CourseCampaign = require('../../models/campaignCourse');
const Module = require('../../models/moduleModel');
const sequelize = require('sequelize');

exports.getAllCourses = async () => {
  try {
    return await Course.findAll();
  } catch (error) {
    console.error(error)
  }
};

exports.getCourseById = async (courseId) => {
  try {
    return await Course.findByPk(courseId);
  } catch (error) {
    console.error(error)
  }
};

exports.createCourse = async (courseData) => {
  try {
    return await Course.create(courseData);
  } catch (error) {
    console.error(error)
  }
};

exports.updateCourse = async (courseId, courseData) => {
  try {
    const course = await Course.findByPk(courseId);
    if (course) {
      await course.update(courseData);
      return course;
    };
    return null;
  } catch (error) {
    console.error(error);
  }

};

exports.deleteCourse = async (courseId) => {
  try {
    const course = await Course.findByPk(courseId);
    if (course) {
      await course.destroy();
      return course;
    };
    return null;
  } catch (error) {
    console.error(error);
  }
};



exports.getCoursesWithModules = async (campaignId) => {
  try {
    const coursesWithModules = await CourseCampaign.findAll({
      where: { campaign_id: campaignId },
      attributes: {
                //contar usuarios por curso, ahora e spor campaña
/*        
        include: [
          [sequelize.fn('COUNT', sequelize.col('CourseStudents.user_id')), 'user_count']
        ],*/
        exclude: ['id']

      },
      include: [
        {
          model: Course,
          include: [
            {
              model: Module,
              as: 'modules',
              attributes: ['is_active', 'created_at', 'name'],
              order: [
                ['created_at', 'DESC']
              ]
            },       
          ],
          group: ['Course.course_id', 'modules.module_id'],
          order: [
            ['created_at', 'DESC']
          ]
        },
      ],
    });
    return coursesWithModules;
  } catch (error) {
    console.error('Error al obtener cursos con módulos:', error);
    throw new Error('Error al obtener cursos con módulos. Detalles en la consola.');
  }
}

/*
exports.getCoursesWithModules = async () => {
  try {
    const coursesWithModules = await CourseCampaign.findAll({
     
      include: [
        {
          model: Course,
          include: [
            {
              model: Module,
              as: 'modules',
              attributes: [
                'is_active',
                'created_at',
                'name'
              ],
            },
            
          ],
        },
        
      ],

    });
    return coursesWithModules;
  } catch (error) {
    console.error('Error al obtener cursos con módulos:', error);
    throw new Error('Error al obtener cursos con módulos. Detalles en la consola.');
  }
}*/