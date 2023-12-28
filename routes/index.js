const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('./auth');
const User = require('./../models/User')

// index Page
router.get('/', forwardAuthenticated, (req, res) => res.render('index', { activePage: 'home' }));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

// Profile
router.get('/profile',ensureAuthenticated, (req, res) =>
res.render('profile', {
  user: req.user
})
);

//edit profile
router.put('/edit_profile/:id' ,ensureAuthenticated, async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render('edit_profile',{user:user});
});

module.exports = router;
