import User from '../models/user';
import R from 'ramda';
import to from 'await-to-js';

async function load(req, res, next, id) {
    let user, err;

    [err, user] = await to(User.findById(id).exec());
    if (err)
        return next(err);

    req.dbUser = user;
    return next();
}

function get(req, res) {
    return res.json(req.dbUser);
}

async function create(req, res, next) {
    let user, err;

    [err, user] = await to(User.create(req.body));
    if (err)
        return next(err);

    return res.json(user);
}

async function update(req, res, next) {
    //TODO add scoping check
    let err;
    const user = req.dbUser;
    let data = R.omit(['createDate', 'type'], req.body);
    Object.assign(user, data);

    [err] = await to(user.save());
    if (err)
        return next(err);

    return res.sendStatus(204);
}

function list(req, res, next) {
    const { limit = 50, skip = 0 } = req.query;
    User.find()
        .skip(skip)
        .limit(limit)
        .exec()
        .then((users) => res.json(users),
            (e) => next(e));
}

async function remove(req, res, next) {
    let err;
    const user = req.dbUser;

    [err] = await to(user.remove());
    if (err)
        return next(err);

    return res.sendStatus(204);
}

export default { load, get, create, update, list, remove };