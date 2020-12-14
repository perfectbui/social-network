const router = require("express").Router();
const User = require("../models/User");
const { authenticate } = require("../middlewares/auth");
const cloudinary = require("../libs/cloudinary");
const upload = require("../libs/multer");
const { issueJwt } = require("../libs/utils");

router.get("/friend/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const existedUser = await User.findOne({ email: email });
    res.status(200).send({
      dataFriend: {
        userName: existedUser.userName,
        avatar: existedUser.avatar,
        age: existedUser.age,
        address: existedUser.address,
        phone: existedUser.phone,
      },
    });
  } catch (error) {
    console.log("Error : ", error);
    res.status(500).json({
      message: error,
    });
  }
});

router.post(
  "/uploadAvatar",
  authenticate,
  upload.single("image"),
  async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      console.log(req.file.path);
      let resultUrl = result.url;
      if (result.width > 550) {
        const image = result.url.split(`/${process.env.CLOUD_NAME}/`)[1];
        resultUrl = cloudinary.url(image, {
          width: 550,
          crop: "fill",
        });
      }
      const idAuthor = req.decoded._id;
      const existedUser = await User.findById(idAuthor);
      existedUser.avatar = resultUrl;
      await existedUser.save();
      issueJwt(existedUser, res);
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

router.put("/edit", authenticate , async (req,res) => {
  try {
      const idAuthor = req.decoded._id;
      const { userName, age, address, phone } = req.body;
      const existedUser = await User.findById(idAuthor);
      existedUser.userName = userName;
      existedUser.age=age;
      existedUser.address=address;
      existedUser.phone=phone;
      await existedUser.save();
      issueJwt(existedUser,res);
      res.status(200).send({
        message: "Edit successfully"
      })
  }
  catch (error) {
    console.log("Error : ",error);
    res.status(500).json({
      message: error,
    });
  }
})

module.exports = router;
