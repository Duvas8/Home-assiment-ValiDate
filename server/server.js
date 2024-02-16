const connectDB = require('./configs/db');
const express = require('express');
const cors = require('cors'); // Import the cors middleware
const registerRouter = require('./routers/registerRouter');
const loginRouter = require('./routers/loginRouter');
const usersRouter = require('./routers/usersRouter');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

// Enable CORS for all routes
app.use(cors());

app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
    res.send('Hello from Express server!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
