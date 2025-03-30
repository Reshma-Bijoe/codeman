const express = require('express');
const cors = require('cors');
const app = express();
const connection = require('./config/db');
const probelmController = require('./controllers/problem.controller');
const LeaderBoardController = require('./controllers/leaderboard.controller');
const SubController = require('./controllers/submissions.controller');
const { register } = require('./controllers/signup.controller');
const login = require('./controllers/login.controller');

app.use(express.json());
app.use(cors());

app.post('/login', login);
app.post('/signup', register);

app.use('/problems', probelmController);
app.use('/leader', LeaderBoardController);
app.use('/sub', SubController);

app.listen(3003, async function () {
    await connection();
    console.log('listening on PORT 3003, DB Connected!!');
});