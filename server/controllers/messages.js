import Message from '../models/message';

function load(req, res, next, id) {
    Message.findById(id)
        .exec()
        .then((message) => {
            req.dbMessage = message;
            return next();
        }, (e) => next(e));
}

function get(req, res) {
    return res.json(req.dbMessage);
}

function create(req, res, next) {
    Message.create({
        owner: req.body.owner,
        text: req.body.text,
        title: req.body.title
    })
        .then((savedMessage) => {
            return res.json(savedMessage);
        }, (e) => {
            console.log('___________________');
            console.log('___________________');
            console.dir(e, {colors: true, depth: 3});
            console.log('___________________');
            console.log('___________________');
            next(e)
        });
}

function update(req, res, next) {
    const message = req.dbMessage;
    Object.assign(message, req.body);

    message.save()
        .then(() => res.sendStatus(204),
            (e) => next(e));
}

function list(req, res, next) {
    const { limit = 50, skip = 0 } = req.query;
    Message.find()
        .skip(skip)
        .limit(limit)
        .exec()
        .then((messages) => res.json(messages),
            (e) => next(e));
}

function remove(req, res, next) {
    const message = req.dbMessage;
    message.remove()
        .then(() => res.sendStatus(204),
            (e) => next(e));
}

export default { load, get, create, update, list, remove };