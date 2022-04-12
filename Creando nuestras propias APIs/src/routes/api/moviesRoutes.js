const express = require('express');
const router = express.Router();
const { store, list, detail, destroy, search } = require('../../controllers/api/moviesController');

router.get('/api/movies', list);
router.get('/api/movies/search', search);
router.get('/api/movies/detail/:id', detail);
router.post('/api/movies', store);
router.delete('/api/movies/:id', destroy);


module.exports = router;