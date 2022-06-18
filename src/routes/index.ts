import express from 'express';
import getImagesList from './api/get/getImagesList.js';
import postImage from './api/post/postImage.js';
import postResize from './api/post/resize.js';

const router = express.Router();

router.use('/get/imagesList', getImagesList);
router.use('/post/resize', postResize);
router.use('/post/uploadImage', postImage);

export default router;
