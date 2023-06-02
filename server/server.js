const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser')
const db = require('./Config/DbConfig');
require('dotenv').config();

const PORT = process.env.PORT;

app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5000'],
    credentials: true
}));
app.use(express.json());
app.use(db);
app.use('/', require('./routes/auth/authentication'));
app.use('/', require('./routes/api/plants'));

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));