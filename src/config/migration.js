const { sequelize } = require('./database');
const DocumentType = require('../models/documentTypeModel');
const Course = require('../models/courseModel');
const Evaluation = require('../models/evaluationModel')
const Quizz = require('../models/quizzModel')
const QuizzType = require('../models/quizzTypeModel')
const Module = require('../models/moduleModel');
const CourseStudent = require('../models/courseStudent');
const User = require('../models/userModel');
const AppSession = require('../models/appSessionModel');
const Profile = require('../models/profileModel');
const DictionaryQuiz = require('../models/dictionaryModel');
const FlashCard  = require('../models/flashCardModel');
const Option  = require('../models/optionModel');
const Role  = require('../models/roleModel');
const  preQuizzResultModel  = require('../models/preQuizzResultModel');

// Sincronizar con la base de datos 
async function authenticateDatabase() {
    try {
      await sequelize.authenticate();
      await sequelize.sync();
      preQuizzResultModel.sync({ force: true }).then(() => {
        console.log('Tabla prequizzresults eliminada exitosamente');
    }).catch(err => {
        console.error('Error al eliminar la tabla prequizzresults:', err);
    });
    
      //await sequelize.sync({ force: true }); //Esto creará las tablas; "force: true" elimina las tablas existentes
      console.log('Conexión a la base de datos establecida con éxito');
    } catch (error) {
      console.error('Error al conectar con la base de datos:', error);
    }
  }
  module.exports = {
    authenticateDatabase,
  
  };