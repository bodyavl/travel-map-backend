const dotenv = require('dotenv');
dotenv.config();

require('./database');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const router = require('./routers/mark');

app.use(cors({ credentials: true, origin: true }));
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json({type: 'application/json'}));

app.use('/mark', router);

function errorHandler(error, req, res, next) {
    res.header("Content-Type", "application/json");
    console.log("Error occured: ", error.message);
    res.status(500).send(error.message);
}

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log('On port', process.env.PORT);
})

