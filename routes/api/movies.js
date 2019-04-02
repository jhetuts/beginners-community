const { Router } = require('express');
const router = new Router();

// @route   Get api/movies
// @desc    Test movies route
// @access  Public
router.get('/movies', (req, res) => {
    res.json({msg: 'Movies work!'});
});

module.exports = router; 