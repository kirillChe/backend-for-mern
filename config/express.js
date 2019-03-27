import express from 'express';
import bodyParser from 'body-parser';
import routes from '../server/routes';
import R from 'ramda';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

export default app;