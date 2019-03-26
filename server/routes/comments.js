import express from 'express';
import commentCtrl from '../controllers/comments';

const router = express.Router();

router.route('/')
/** GET /api/comments - Get list of comments */
    .get(commentCtrl.list)

    /** POST /api/comments - Create new comment */
    .post(commentCtrl.create);

router.route('/:commentId')
/** GET /api/comments/:commentId - Get comment */
    .get(commentCtrl.get)

    /** PUT /api/comments/:commentId - Update comment */
    .put(commentCtrl.update)

    /** DELETE /api/comments/:commentId - Delete comment */
    .delete(commentCtrl.remove);

/** Load comment when API with commentId route parameter is hit */
router.param('commentId', commentCtrl.load);

export default router;