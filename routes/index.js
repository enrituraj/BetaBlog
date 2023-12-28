const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('./auth');
const User = require('./../models/User')
const Blog = require('./../models/Blog')

// index Page
router.get('/', forwardAuthenticated, (req, res) => res.render('index', { activePage: 'home' }));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

// add blog
router.get('/create_blog', ensureAuthenticated, (req, res) =>
  res.render('create_blog', {
    user: req.user
  })
);

// add blog
router.post('/create_blog', ensureAuthenticated,async (req, res) => {

  const {title,author,content} = req.body;

    try {
    // const image = {
    //   data: req.file.buffer,
    //   contentType: req.file.mimetype
    // };

    const savedBlog = new Blog({
      title: title,
      content: content,
      author:author,
      //images: [image]
    });

    const saved = await savedBlog.save();

    res.json({ success: true, blogId: saved._id });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }

});

router.get('/blogs/:id',ensureAuthenticated, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.render('blog', { blog: blog ,
      user: req.user
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// all_blog
router.get('/all_blog',ensureAuthenticated, async(req, res) =>{
  const blogs = await Blog.find({});
  res.render('all_blog.ejs', { blogs: blogs  , user: req.user});
});


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
