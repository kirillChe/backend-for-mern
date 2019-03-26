import Rating from '../models/rating';

function load(req, res, next, id) {
    Rating.findById(id)
        .exec()
        .then((rating) => {
            req.dbRating = rating;
            return next();
        }, (e) => next(e));
}

function get(req, res) {
    return res.json(req.dbRating);
}

function create(req, res, next) {
    Rating.create({
        owner: req.body.owner,
        text: req.body.text,
        title: req.body.title
    })
        .then((savedRating) => {
            return res.json(savedRating);
        }, (e) => {
            next(e)
        });
}

function update(req, res, next) {
    const rating = req.dbRating;
    Object.assign(rating, req.body);

    rating.save()
        .then(() => res.sendStatus(204),
            (e) => next(e));
}

function list(req, res, next) {
    const { limit = 50, skip = 0 } = req.query;
    Rating.find()
        .skip(skip)
        .limit(limit)
        .exec()
        .then((ratings) => res.json(ratings),
            (e) => next(e));
}

function remove(req, res, next) {
    const rating = req.dbRating;
    rating.remove()
        .then(() => res.sendStatus(204),
            (e) => next(e));
}

export default { load, get, create, update, list, remove };