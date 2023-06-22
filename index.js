const dotenv = require('dotenv');
dotenv.config();

require('./database');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const router = require('./routers/mark');
const { userRouter } = require('./routers/user')
const socketController = require('./controllers/socketController')

const io = require('socket.io')(http, {
    cors: {
        origin: true
    }
});

app.use(cors({ credentials: true, origin: true }));
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json({type: 'application/json'}));

app.use('/mark', router);
app.use('/user', userRouter);


function errorHandler(error, req, res, next) {
    res.header("Content-Type", "application/json");
    console.log("Error occured: ", error.message);
    res.status(500).send(error.message);
}

app.use(errorHandler);

io.on('connection', socketController)

http.listen(process.env.PORT || 5000, () => {
    console.log('On port', process.env.PORT);
})

