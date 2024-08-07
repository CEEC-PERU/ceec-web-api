const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 4100;
const jwt = require('jsonwebtoken')
const { authenticateDatabase } = require('./src/config/migration');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
authenticateDatabase();

const SocketService = require('./src/services/socketService');
require('./src/models/relations')
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Expose-Headers", "X-FileName"); // Agrega esta línea
  next();
});

app.use('/api/courses', require('./src/routes/courses/courseRoutes'));
app.use('/api/modules', require('./src/routes/courses/moduleRoutes'));
//crear evaluaciones
app.use('/api/evaluations', require('./src/routes/courses/evaluationRoutes'));
app.use('/api/quizzes', require('./src/routes/courses/quizzRoutes'));
app.use('/api/custom', require('./src/routes/courses/customAdminRoutes'));
app.use('/api/appsession', require('./src/routes/users/appSessionRoutes'))
app.use('/api/usersesion', require('./src/routes/users/userSesionRoutes'))
app.use('/api/users', require('./src/routes/users/userRoutes'))
app.use('/api/dictionaryquizz', require('./src/routes/courses/dictionaryQuizzRoutes'));
app.use('/api/prequizzresults', require ('./src/routes/courses/prequizzResultRoutes'))
app.use('/api/evaluation', require('./src/routes/courses/customEvaluationRoutes'));
app.use('/api/prequizzresult', require('./src/routes/courses/customPrequizzRoutes'));
app.use('/api/image-service', require('./src/routes/courses/imageRoutes'))
app.use('/api/ranking', require('./src/routes/courses/rankingRoutes'))
app.use('/api/requirement', require('./src/routes/clients/requirementRoutes'))
app.use('/api/profiles', require('./src/routes/users/profileRoutes'))
app.use('/api/quizztypes', require('./src/routes/courses/quizzTypeRoutes'));
app.use('/api/flashcard', require('./src/routes/courses/flashCardRoutes'));
app.use('/api/coursestudent', require('./src/routes/courses/courseStudentRoutes'));
app.use('/api/evaluationresults', require('./src/routes/courses/evaluationResultRoutes'));
app.use('/api/campaigns', require('./src/routes/campaign/campaignRoutes'));
app.use('/api/campaignuser', require('./src/routes/campaign/campaignUserRoutes'));
app.use('/api/campaigncourses', require('./src/routes/campaign/campaignCourseRoutes'));
app.use('/api/customcampaign', require('./src/routes/campaign/customCampaignRoutes'));
app.use('/api/prequizz', require('./src/routes/courses/prequizzRoutes'));
app.use('/api/dictionary', require('./src/routes/courses/dictionaryRoutes'));
app.use('/api/clients', require('./src/routes/clients/clientsRoutes'));
app.use('/api/auth', require('./src/routes/auth/auth-route'));
app.use('/api/notifications', require('./src/routes/notificacions/notificactionsRoutes'));
SocketService(server);

server.listen(PORT, () => {
  console.log(`Server is running 🚀🚀🚀`);
 /* const password = '123456';
  const saltRounds = 10;

bcrypt.hash(password, saltRounds, function(err, hash) {
  // Store hash in your password DB.
  console.log(hash); // This is the encrypted password
});*/
});
