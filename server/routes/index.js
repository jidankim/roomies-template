import express from 'express';
import account from './account';
import event from './event';
import profile from './profile';
import dorms from './dorms';

const router = express.Router();
router.use('/account', account);
router.use('/event', event);
router.use('/profile', profile);
router.use('/dorms', dorms);

export default router;
