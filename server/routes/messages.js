import express from 'express';
import messageCtrl from '../controllers/messages';

const router = express.Router();

router.route('/')
/** GET /api/messages - Get list of messages */
    .get(messageCtrl.list)

    /** POST /api/messages - Create new message */
    .post(messageCtrl.create);

router.route('/:messageId')
/** GET /api/messages/:messageId - Get message */
    .get(messageCtrl.get)

    /** PUT /api/messages/:messageId - Update message */
    .put(messageCtrl.update)

    /** DELETE /api/messages/:messageId - Delete message */
    .delete(messageCtrl.remove);

/** Load message when API with messageId route parameter is hit */
router.param('messageId', messageCtrl.load);

export default router;