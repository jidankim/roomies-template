import express from 'express';
import account from './account';
import event from './event';

const router = express.Router();
router.use('/account', account);
router.use('/event', event);

export default router;
