import express from 'express';
import account from './account';
import event from './event';
import profile from './profile';

const router = express.Router();
router.use('/account', account);
router.use('/event', event);
router.use('/profile', profile);

export default router;
