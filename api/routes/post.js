const router = require('express').Router();
const Post = require('../model/post');
const mongoose = require('mongoose');
const uploadMiddleware = require('../middleware/upload');
// const jwt = require('jsonwebtoken');
// const secretKey = 'asfgtdjvfyuhiobmsp';

//create new  post
router.post('/', uploadMiddleware.single('articleImage'), async (req, res) => {
  try {
    //     const token = req.cookies.token;
    //     console.log(token);
    //     // Verify token and extract user details
    //     jwt.verify(token, secretKey, async (err, decoded) => {
    //       if (err) {
    //         // Token is not valid
    //         res.status(401).json({ error: 'Unauthorized' });
    //       }
    // else{
    const { title, summary, content, categories, articleImage }  = req.body;

    const newPost = new Post({
      title: req.body.title,
      summary: req.body.summary,
      content: req.body.content,
      categories: req.body.categories,
      articleImage: req.file.originalname,
    });
    //validating input data
    if (!title || !content || !summary || !categories) {
      return res.status(400).json({ msg: 'please provide all information' });
    }
    //saving new post to the database
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update post
router.put(
  '/:id',
  uploadMiddleware.single('articleImage'),
  async (req, res) => {
    const { id } = req.params;
    const { title, summary, content, categories, articleImage } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`post ${id} not found`);

    const updatedPost = {
      title,
      summary,
      categories,
      content,
      articleImage: req.file.originalname,
      _id: id,
    };
    // {new:true}
    const post = await Post.findByIdAndUpdate(id, updatedPost, {
      new: true,
    });

    if (!post) {
      return res.status(404).send(`post ${id} not found`);
    }

    res.status(200).json(post);
  }
);

// delete
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`Post ${id} not found`);
  }

  const post = await Post.findByIdAndDelete(id);

  if (!post) {
    return res.status(404).send(`Post ${id} not found`);
  }
  // await post.remove();

  res.status(200).json(`Post with ${id} has been deleted!`);

  //         const deletePost = async (req, res) => {
  //   try {
  //     const { id } = req.params;

  //     const deletedPost = await Post.findByIdAndDelete(id);

  //     if (!deletedPost) {
  //       return res.status(404).send(`Post ${id} not found`);
  //     }

  //     res.status(200).json({ message: `Post ${id} deleted successfully` });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: "Internal server error" });
  //   }
  // };
});

// get post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json(error);
  }
});

// get all post

router.get('/', async (req, res) => {
  // const All = await Post.find().populate('author', ['username']);
  const All = await Post.find().sort({ createdAt: 'descending' });
  res.json(All);
  // .limit(25);
});

// router.get("/",async (req, res) => {
//   const { id } = req.params;
//   const postDoc = await Post.findBYId(id).populate('author', ['username']);
//   res.json(postDoc);
// })

// router.get("/", async (req, res) => {
//   const username = req.query.user
//   const catName = req.query.cat
//   try {
//     let posts
//     if (username) {
//       posts = await Post.find({ username: username })
//     } else if (catName) {
//       posts = await Post.find({
//         categories: {
//           $in: [catName],
//         },
//       })
//     } else {
//       posts = await Post.find()
//     }
//     res.status(200).json(posts)
//   } catch (error) {
//     res.status(404).json(error)
//   }
// })

module.exports = router;
