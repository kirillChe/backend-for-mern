import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import errorhandler from 'errorhandler';
import morgan from 'morgan';
import mongoose from 'mongoose';
import R from 'ramda';

import routes from './server/routes';
import config from './config/env';

const isProduction = process.env.NODE_ENV === 'production';

// Create global app object
const app = express();

//TODO Don't leave it as is
app.use(cors(/*{
    origin: 'http://192.168.68.123:3000',
    credentials: true
}*/));

//HTTP request logger
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

if (!isProduction)
    app.use(errorhandler());


mongoose.connect(config.db, {useNewUrlParser: true});

mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${config.db}`);
});

mongoose.connection.on('connected', () => {
    console.log(`Connected to database: ${config.db}`);
});

if (!isProduction)
    mongoose.set('debug', true);

// mount all routes on /api path
app.use('/api', routes);


app.use((err, req, res, next) => {
    if (err && err.name === 'ValidationError') {
        err.status = 422;
        err.message = err._message;
        err.details = R.map(R.pickAll(['message', 'path', 'value']), err.errors);
    } else {
        err.status = 500;
        err.message = 'Something went wrong';
    }

    return res.status(err.status)
        .json({
            status: err.status,
            message: err.message,
            details: err.details
        });
});

app.listen(config.port, () => {
    console.log(`API Server started and listening on port ${config.port} (${config.env})`);
});

export default app;