const Evaluation = require('./evaluationModel')
const Quizz = require('./quizzModel')
const QuizzType = require('./quizzTypeModel')
const Course = require('./courseModel');
const Module = require('./moduleModel');

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
const DictionaryQuiz = require('./dictionaryModel');
const CampaignUser = require('./campaignUser');


///////////////////////////////////////////////////////////////////////////////





///////////////////////////////////////////////////////////////////////////////

State.hasMany(CampaignUser, {
    foreignKey: 'id_state',
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

// Un usuario se le asigna una campaña (relación a través de CampaignUser)
User.belongsToMany(Campaign, { through: CampaignUser, foreignKey: 'user_id' });

// Un usuario pertenece a un rol
User.belongsTo(Role, {
    foreignKey: 'role_id',
});


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





// Un curso puede tener muchas relaciones de curso de campaña
Course.hasMany(CampaignCourse, { foreignKey: 'course_id' });

Course.hasMany(Campaign,  { foreignKey: 'campaign_id' });
///////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////


// varios curso de campaña pertenece a un curso
CampaignCourse.belongsTo(Course, { foreignKey: 'course_id' });


// varios curso de campaña están asociado con una campaña
CampaignCourse.belongsTo(Campaign, {
    foreignKey: 'campaign_id',
});

// Un curso de campaña está asociado con un curso
CampaignCourse.belongsTo(Course, {
    foreignKey: 'course_id',
});


// Un curso de campaña está asociado con un curso
CampaignCourse.belongsTo(CampaignUser, {
    foreignKey: 'campaign_id',
  });


  CampaignUser.belongsTo(Campaign, {
    foreignKey: 'campaign_id',
  });
  
  
///////////////////////////////////////////////////////////////////////


// Un tipo de cuestionario puede tener varias preguntas
QuizzType.hasMany(Quizz, {
    foreignKey: 'quizz_type',
    as: 'questions',
});


/////////////////////////////////////////////////////////////////////////////////////

// Un cuestionario de diccionario pertenece a un módulo
DictionaryQuiz.belongsTo(Module, {
    foreignKey: 'dictionary_id',
});

////////////////////////////////////////////////////////////////////////////////////////////

// Una sesión de aplicación pertenece a un usuario
AppSession.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'usersession',
});

////////////////////////////////////////////////////////////////////////////////////////////



// Un usuario se le asigna una campaña (relación a través de CampaignUser)
Campaign.belongsToMany(User, { through: CampaignUser, foreignKey: 'campaign_id' });

Campaign.belongsToMany(Course, { through: CampaignCourse, foreignKey: 'campaign_id' });

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


