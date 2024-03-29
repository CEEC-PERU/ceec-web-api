const Evaluation = require('./evaluationModel')
const Quizz = require('./quizzModel')
const QuizzType = require('./quizzTypeModel')
const Course = require('./courseModel');
const Module = require('./moduleModel');
const CourseStudent = require('./courseStudent');
const User = require('./userModel');
const AppSession = require('./appSessionModel');
const Profile = require('./profileModel');
const DocumentType = require('./documentTypeModel');
const EvaluationResult = require('./evaluationResultModel');
const Role = require('./roleModel');
const PrequizzResult = require('./preQuizzResultModel');
const Campaign = require('./campaignModel');
const CampaignCourse = require('./campaignCourse');
const State = require('./StateModel');
const CamapaignUser = require('./campaignUser');


///////////////////////////////////////////////////////////////////////////////

State.hasMany(CampaignCourse, {
    foreignKey: 'user_id',
});

/////////////////////////////////////////////////////////////////////////////
//un usuario tiene un perfil
User.hasOne(Profile, {
    foreignKey: 'user_id',
});

// Un usuario puede tener varias sesiones de aplicación
User.hasMany(AppSession, {
    foreignKey: 'user_id',
    as: 'appsessions',
});

// Un usuario puede tener muchos resultados de evaluación
User.hasMany(EvaluationResult, {
    foreignKey: 'user_id',
});


// Un usuario puede tener varios resultados de prequizz
User.hasMany(PrequizzResult,{
    foreignKey: 'user_id',
});

///??
// Un usuario puede estar asociado con muchos cursos
User.belongsToMany(Course, {
    through: CourseStudent,
    foreignKey: 'user_id',
});


// Un usuario puede tener muchas relaciones de estudiante de curso?
User.hasMany(CourseStudent, { foreignKey: 'user_id' });

// Un usuario pertenece a un rol
User.belongsTo(Role, {
    foreignKey: 'role_id',
});
// En el modelo User.js
User.hasMany(CourseStudent, { foreignKey: 'user_id' });



//////////////////////////////////////////////////////////////////

Profile.belongsTo(User, {
    foreignKey: 'user_id',
});

Profile.belongsTo(DocumentType, {
    foreignKey: 'document_id'
});

///////////////////////////////////////////////////////


// Una evaluación puede tener muchas preguntas
Evaluation.hasMany(Quizz, {
    foreignKey: 'evaluation_id',
})
// Una evaluación pertenece a un módulo
Evaluation.belongsTo(Module, {
    foreignKey: 'module_id'
})

// Una evaluación puede tener muchos resultados de evaluación
Evaluation.hasMany(EvaluationResult, {
    foreignKey: 'evaluation_id',
});

/////////////////////////////////////////////////////////////////////////

//Un resultado de evaluación pertenece a un usuario
EvaluationResult.belongsTo(User,{
    foreignKey: 'user_id',
});

//Un resultado de evaluación pertenece a una evaluación
EvaluationResult.belongsTo(Evaluation,{
    foreignKey: 'evaluation_id',
});

/////////////////////////////////////////////////////////////////////////

// Un módulo pertenece a un curso
Module.belongsTo(Course, {
    foreignKey: 'course_id',
    as: 'course',
});


// Un módulo tiene una evaluación
Module.hasOne(Evaluation, {
    foreignKey: 'module_id',
})

/////////////////////////////////////////////////////////////////////////


// Un resultado de prequizz puede pertenecer a un curso
PrequizzResult.belongsTo(Course, {
    foreignKey: 'course_id',
})

// Un resultado de prequizz puede pertenecer a un usuario
PrequizzResult.belongsTo(User,{
    foreignKey: 'user_id',
});


/////////////////////////////////////////////////////////////////////////


//un perfil tiene un tipo de documento
DocumentType.hasOne(Profile, {
    foreignKey: 'document_id'
})

///////////////////////////////////////////////////////////////////////

// Un cuestionario pertenece a una evaluación
Quizz.belongsTo(Evaluation, {
    foreignKey: 'evaluation_id',
});

// Un cuestionario pertenece a un tipo de cuestionario
Quizz.belongsTo(QuizzType, {
    foreignKey: 'quizz_type',
    as: 'quizzType',
});


///////////////////////////////////////////////////////////////////////

//un curso tiene varios modulos
Course.hasMany(Module, {
    foreignKey: 'course_id',
    as: 'modules',
});

// Un curso puede tener varios resultados de prequizz
Course.hasMany(PrequizzResult, {
    foreignKey: 'course_id',
})


// Un curso puede estar asociado con muchos usuarios?
Course.belongsToMany(User, {
    through: CourseStudent,
    foreignKey: 'course_id',
});

// Un curso puede pertenecer a varias campañas
Course.belongsToMany(Campaign, {
    through: CampaignCourse,
    foreignKey: 'course_id',
});

// Un curso puede tener muchas relaciones de estudiante de curso
Course.hasMany(CourseStudent, { foreignKey: 'course_id' });


// Un curso puede pertenecer a varias campañas
Course.belongsToMany(Campaign, { through: CampaignCourse, foreignKey: 'course_id' });


// Un curso puede tener muchas relaciones de curso de campaña
Course.hasMany(CampaignCourse, { foreignKey: 'course_id' });



///////////////////////////////////////////////////////////////////


// Un estudiante de curso pertenece a un usuario
CourseStudent.belongsTo(User, { foreignKey: 'user_id' });

// Un estudiante de curso pertenece a un curso
CourseStudent.belongsTo(Course, { foreignKey: 'course_id' });

// Un estudiante de curso pertenece a un curso de campaña
CourseStudent.belongsTo(CampaignCourse, { foreignKey: 'course_id' });


// Un estudiante de curso puede tener varios resultados de prequizz
CourseStudent.hasMany(PrequizzResult, { foreignKey: 'course_id' });


///////////////////////////////////////////////////////////////////////////

// Un curso de campaña pertenece a una campaña
CampaignCourse.belongsTo(Campaign, { foreignKey: 'campaign_id' });

// Un curso de campaña pertenece a un curso
CampaignCourse.belongsTo(Course, { foreignKey: 'course_id' });

// Un curso de campaña pertenece a un estudiante de curso
CampaignCourse.belongsTo(CourseStudent, { foreignKey: 'course_id' });

// Un curso de campaña está asociado con una campaña
CampaignCourse.belongsTo(Campaign, {
    foreignKey: 'campaign_id',
});

// Un curso de campaña está asociado con un curso
CampaignCourse.belongsTo(Course, {
    foreignKey: 'course_id',
});


///////////////////////////////////////////////////////////////////////


// Un tipo de cuestionario puede tener varias preguntas
QuizzType.hasMany(Quizz, {
    foreignKey: 'quizz_type',
    as: 'questions',
});


/////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////

// Una sesión de aplicación pertenece a un usuario
AppSession.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'usersession',
});

////////////////////////////////////////////////////////////////////////////////////////////


// Una campaña puede estar asociada con muchos cursos
Campaign.belongsToMany(Course, {
    through: CampaignCourse,
    foreignKey: 'campaign_id',
});


//////////////////////////////////////////////////////////////////////////

// Un resultado de prequizz pertenece a un curso
PrequizzResult.belongsTo(Course, { foreignKey: 'course_id' });


///////////////////////////////////////////////////////////////////////////

// Un rol tiene un usuario
Role.hasOne(User, {
    foreignKey: 'role_id',
})


//un usuario tiene varios cursos
// User.belongsToMany(Course, {
//     through: { model: CourseStudent, unique: false },
//     foreignKey: 'user_id',
//     otherKey: 'course_id',
// });

// Course.belongsToMany(User, {
//     through: { model: CourseStudent, unique: false },
//     foreignKey: 'user_id',
//     otherKey: 'course_id',
// });


//si no cargar evaluacion , 


