const router = require("express").Router();
const { authenticate } = require("../middlewares/auth");
const Post = require("../models/Post");
const upload = require("../libs/multer");
const cloudinary = require("../libs/cloudinary");

router.get("/", async (req, res) => {
  try {
    const allPost = await Post.find({})
      .populate("author")
      .populate("comments.user")
      .populate("reacts.likes.user", "email")
      .populate("reacts.shares.user", "email")
      .sort({ timeCreated: -1 });

    res.status(200).json({
      posts: allPost,
    });
  } catch (err) {
    console.log("Error : ", err);
    res.status(400).json({
      message: err,
    });
  }
});

router.get("/:email", async (req, res) => {
  try {
    const email = req.params["email"];

    Post.find({})
      .sort({ timeCreated: -1 })
      .populate({
        path: "author",
        select: "userName avatar email age address phone",
      })
      .populate("comments.user")
      .populate("reacts.likes.user", "email")
      .populate("reacts.shares.user", "email")
      .exec((err, docs) => {
        if (err) {
          throw new Error(err);
        }
        docs = docs.filter(
          (doc) =>
            doc.author.email === email ||
            doc.reacts.shares.filter((data) => data.user.email === email).length>0
        );
        res.status(200).json({
          posts: docs,
        });
      });
  } catch (err) {
    console.log("Error : ", err);
    res.status(400).json({
      message: err,
    });
  }
});

router.post(
  "/uploadImg",
  authenticate,
  upload.single("image"),
  async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      let resultUrl = result.url;
      if (result.width > 550) {
        const image = result.url.split(`/${process.env.CLOUD_NAME}/`)[1];
        resultUrl = cloudinary.url(image, {
          width: 550,
          crop: "fill",
        });
      }

      res.status(200).json({
        imageUrl: resultUrl,
      });
    } catch (error) {
      console.log("Error : ", error);
      res.status(500).json({
        message: error,
      });
    }
  }
);

router.post("/", authenticate, async (req, res) => {
  try {
    const idAuthor = req.decoded._id;
    const { content, image } = req.body;

    const newPost = new Post({
      content,
      image,
      author: idAuthor,
    });
    await newPost.save();

    res.status(200).json({
      post: newPost,
    });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

router.post("/comment", authenticate, async (req, res) => {
  try {
    const idUser = req.decoded._id;
    const { postId, contentComment } = req.body;
    const existedPost = await Post.findById(postId);
    if (existedPost) {
      existedPost.comments.push({ user: idUser, content: contentComment });
      await existedPost.save();
      res.status(200).send({
        post: existedPost,
      });
    } else {
      res.status(500).send({
        message: "Post Not Found",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

router.post("/like", authenticate, async (req, res) => {
  try {
    const idUser = req.decoded._id;
    const { postId } = req.body;
    const existedPost = await Post.findById(postId);
    if (existedPost) {
      const existedUser = existedPost.reacts.likes.filter(
        (data) => data.user == idUser
      );
      if (existedUser.length > 0) {
        existedPost.reacts.likes = existedPost.reacts.likes.filter(
          (data) => data.user != idUser
        );
      } else {
        existedPost.reacts.likes.push({ user: idUser });
      }
      await existedPost.save();
      res.status(200).send({
        post: existedPost,
      });
    } else {
      res.status(500).send({
        message: "Post Not Found",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

router.post("/share", authenticate, async (req, res) => {
  try {
    const idUser = req.decoded._id;
    const { postId } = req.body;
    const existedPost = await Post.findById(postId);
    if (existedPost) {
      const existedUser = existedPost.reacts.shares.filter(
        (data) => data.user == idUser
      );
      if (existedUser.length > 0) {
        existedPost.reacts.shares = existedPost.reacts.shares.filter(
          (data) => data.user != idUser
        );
      } else {
        existedPost.reacts.shares.push({ user: idUser });
      }
      await existedPost.save();
      res.status(200).send({
        post: existedPost,
      });
    } else {
      res.status(500).send({
        message: "Post Not Found",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

router.delete("/delete", authenticate, async (req, res) => {
  try {
    const idUser = req.decoded._id;
    const { postId } = req.body;
    const existedPost = await Post.remove({_id:postId});
    res.send({message:"Delete course successfully"});
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

router.delete("/delete/comment", authenticate, async (req, res) => {
  try {
    const { postId,commentId } = req.body;
    const existedPost = await Post.findById(postId);
    existedPost.comments = existedPost.comments.filter(comment => comment._id != commentId);
    res.send({message:"Delete comment successfully"});
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});



// router.delete('/:postId', authenticate, async (req, res) => {
// 	try {
// 		const { postId } = req.params;
// 		const post = await Post.findById(postId, 'userPost');
// 		if (post.userPost.toString() === req.decoded._id) {
// 			await Post.deleteOne({ _id: postId });
// 			res.status(200).end();
// 		} else {
// 			res.status(401).json({
// 				message: 'Không có quyền xóa bài đăng',
// 			});
// 		}
// 	} catch (err) {
// 		res.status(400).json({
// 			message: err,
// 		});
// 	}
// });

// router.delete('/', async (req, res) => {
// 	await Post.deleteMany({});
// 	res.end();
// });

module.exports = router;
