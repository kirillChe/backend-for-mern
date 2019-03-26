import express from 'express';
import userRoutes from './users';
import messageRoutes from './messages';
import authRoutes from './auth';

const router = express.Router();

/** GET /api-status - Check service status **/
router.get('/api-status', (req, res) =>
    res.json({
        status: 'ok'
    })
);

router.use('/users', userRoutes);
router.use('/messages', messageRoutes);
router.use('/auth', authRoutes);

export default router;