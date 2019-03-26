import express from 'express';
import userRoutes from './users';
import commentRoutes from './comments';
import messageRoutes from './messages';
import ratingRoutes from './ratings';
import authRoutes from './auth';

const router = express.Router();

/** GET /api-status - Check service status **/
router.get('/api-status', (req, res) =>
    res.json({
        status: 'ok'
    })
);

router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/messages', messageRoutes);
router.use('/ratings', ratingRoutes);
router.use('/auth', authRoutes);

export default router;