import express from 'express';
import ratingCtrl from '../controllers/ratings';

const router = express.Router();

router.route('/')
/** GET /api/ratings - Get list of ratings */
    .get(ratingCtrl.list)

    /** POST /api/ratings - Create new rating */
    .post(ratingCtrl.create);

router.route('/:ratingId')
/** GET /api/ratings/:ratingId - Get rating */
    .get(ratingCtrl.get)

    /** PUT /api/ratings/:ratingId - Update rating */
    .put(ratingCtrl.update)

    /** DELETE /api/ratings/:ratingId - Delete rating */
    .delete(ratingCtrl.remove);

/** Load rating when API with ratingId route parameter is hit */
router.param('ratingId', ratingCtrl.load);

export default router;