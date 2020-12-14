const router = require("express").Router();
const { authenticate } = require("../middlewares/auth");
const bcrypt = require('bcrypt');
const User = require("../models/User");
const Post = require("../models/Post");

// router.get("/create", async (req, res) => {
//   try {
//     const hashPassword =  await bcrypt.hash("admin", 10);
//     const newUser = new User({
//       userName:'admin',
//       email:'admin@gmail.com',
//       password: hashPassword,
//       address:'123 Hai Ba Trung',
//       phone:'1717171717',
//       isAdmin:true,
//       age: 20,
//     });
//     await newUser.save();
//     res.status(200).send({message:"Create admin success"});
//   } catch (err) {
//     res.status(400).json({
//       message: err,
//     });
//   }
// });

router.get("/users", authenticate, async (req, res) => {
  try {
    const idAdmin = req.decoded._id;
    const existedUser = await User.findById(idAdmin);
    if (existedUser.isAdmin) {
      const users = await User.find({});
      res.status(200).send(users);
    } else {
      res.status(200).send({ message: "You are not admin!!" });
    }
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

router.delete("/users", authenticate, async (req, res) => {
  try {
    const idAdmin = req.decoded._id;
    const existedUser = await User.findById(idAdmin);
    const { idDeletedUser } = req.body;
    if (existedUser.isAdmin) {
      await User.remove({ _id: idDeletedUser });
      const users = await User.find({});
      res.status(200).send(users);
    } else {
      res.status(200).send({ message: "You are not admin!!" });
    }
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

router.get("/posts", authenticate, async (req, res) => {
  try {
    const idAdmin = req.decoded._id;
    const existedUser = await User.findById(idAdmin);
    if (existedUser.isAdmin) {
      const posts = await Post.find({}).populate("author");
      res.status(200).send(posts);
    } else {
      res.status(200).send({ message: "You are not admin!!" });
    }
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

router.delete("/posts", authenticate, async (req, res) => {
  try {
    const idAdmin = req.decoded._id;
    const existedUser = await User.findById(idAdmin);
    const { idDeletedPost } = req.body;
    if (existedUser.isAdmin) {
      const posts = await Post.remove({ _id: idDeletedPost });
      res.status(200).send(posts);
    } else {
      res.status(200).send({ message: "You are not admin!!" });
    }
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

module.exports = router;
