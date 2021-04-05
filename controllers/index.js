const router = require('express').Router();

const { route } = require('./api');
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

//catch all route
router.use((req,res) => {
    res.status(404).end();
});

module.exports = router;