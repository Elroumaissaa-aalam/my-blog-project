const express = require('express');
const router = express.Router();
const controller = require('../controllers/postController');

router.post('/', controller.createPost);
router.get('/', controller.getPosts);
router.get('/:slug', controller.getPostBySlug);
router.put('/:id', controller.updatePost);
router.delete('/:id', controller.deletePost);

module.exports = router;



