import Comment from '../models/comment';

function load(req, res, next, id) {
    Comment.findById(id)
        .exec()
        .then((comment) => {
            req.dbComment = comment;
            return next();
        }, (e) => next(e));
}

function get(req, res) {
    return res.json(req.dbComment);
}

function create(req, res, next) {
    Comment.create({
        owner: req.body.owner,
        text: req.body.text,
        title: req.body.title
    })
        .then((savedComment) => {
            return res.json(savedComment);
        }, (e) => {
            next(e)
        });
}

function update(req, res, next) {
    const comment = req.dbComment;
    Object.assign(comment, req.body);

    comment.save()
        .then(() => res.sendStatus(204),
            (e) => next(e));
}

function list(req, res, next) {
    const { limit = 50, skip = 0 } = req.query;
    Comment.find()
        .skip(skip)
        .limit(limit)
        .exec()
        .then((comments) => res.json(comments),
            (e) => next(e));
}

function remove(req, res, next) {
    const comment = req.dbComment;
    comment.remove()
        .then(() => res.sendStatus(204),
            (e) => next(e));
}

export default { load, get, create, update, list, remove };