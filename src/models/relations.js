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
const DictionaryQuiz = require('./dictionaryQuizModel');
const Option = require('./optionModel')
const EvaluationResult = require('./evaluationResultModel');
const Role = require('./roleModel');

//un usuario tiene un perfil
User.hasOne(Profile, {
    foreignKey: 'user_id',
});

Profile.belongsTo(User, {
    foreignKey: 'user_id',
});

//un perfil tiene un tipo de documento
DocumentType.hasOne(Profile, {
    foreignKey: 'document_id'
})

Profile.belongsTo(DocumentType, {
    foreignKey: 'document_id'
});

//una evaluacion tiene varias preguntas 
Evaluation.hasMany(Quizz, {
    foreignKey: 'evaluation_id',
})


Quizz.belongsTo(Evaluation, {
    foreignKey: 'evaluation_id',
});

//un tipo de quizz tiene varias preguntas
QuizzType.hasMany(Quizz, {
    foreignKey: 'quizz_type',
    as: 'questions',
});


Quizz.belongsTo(QuizzType, {
    foreignKey: 'quizz_type',
    as: 'quizzType',
});

//una pregunta tiene varias opciones
Quizz.hasMany(Option, {
    foreignKey: 'quizz_id',
})

Option.belongsTo(Quizz, {
    foreignKey: 'quizz_id',
})

//un curso tiene varios modulos
Course.hasMany(Module, {
    foreignKey: 'course_id',
    as: 'modules',
});

Module.belongsTo(Course, {
    foreignKey: 'course_id',
    as: 'course',
});

//un modulo tiene un diccionario
Module.hasMany(DictionaryQuiz, {
    foreignKey: 'module_id',
})

DictionaryQuiz.belongsTo(Module, {
    foreignKey: 'dictionary_id',
});

//un modulo tiene una evaluación
Module.hasOne(Evaluation, {
    foreignKey: 'module_id',
})

Evaluation.belongsTo(Module, {
    foreignKey: 'module_id'
})


//un usuario tiene varias sesiones
User.hasMany(AppSession, {
    foreignKey: 'user_id',
    as: 'appsessions',
});

AppSession.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'usersession',
});


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

//el resultado de una evaluación tiiene un usuario y una evaluacion
EvaluationResult.belongsTo(User,{
    foreignKey: 'user_id',
});

EvaluationResult.belongsTo(Evaluation,{
    foreignKey: 'evaluation_id',
});


User.hasMany(EvaluationResult, {
    foreignKey: 'user_id',
});

Evaluation.hasMany(EvaluationResult, {
    foreignKey: 'evaluation_id',
});

// En el modelo User
User.belongsToMany(Course, {
    through: CourseStudent,
    foreignKey: 'user_id',
});

// En el modelo Course
Course.belongsToMany(User, {
    through: CourseStudent,
    foreignKey: 'course_id',
});

User.belongsTo(Role, {
    foreignKey: 'role_id',
});

Role.hasOne(User, {
    foreignKey: 'role_id',
})

CourseStudent.belongsTo(User, { foreignKey: 'user_id' });
CourseStudent.belongsTo(Course, { foreignKey: 'course_id' });
User.hasMany(CourseStudent, { foreignKey: 'user_id' });
Course.hasMany(CourseStudent, { foreignKey: 'course_id' });
