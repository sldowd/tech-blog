const router = require('express').Router();
const { User, Post } = require('../../models');

// get
router.get('/', (req,res) => {
    User.findAll({
        attributes: {exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});
// get by id
router.get('/', (req,res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: {exclude: ['password'] },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_body', 'created_at']
            }
        ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'User not found'})
            return;
        }
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// post -- create new user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id= dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json(dbUserData)
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});
// post -- user login
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'User not found' });
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ mesage: 'Incorrect password'});
            return;
        }

        //add session to login
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            
            res.json({ user: dbUserData, message: 'You are now logged in'})
        })
    })
});
// update / put
router.put('/:id', (req, res) => {
    //if req.body has exact key/value pairs to match model you can just use req.body
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//logout route -- clears session
router.post('/logout', (req,res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            console.log('+++++++++++++=============================================You have logged out');
            res.status(204).end();
        })
    } else {
        res.status(404).end();
    }
})

module.exports = router;