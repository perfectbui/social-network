const router = require('express').Router();
const User = require('../models/User')
const {authenticate} = require('../middlewares/auth')
const cloudinary = require("../libs/cloudinary");
const upload = require("../libs/multer");
const {issueJwt} = require("../libs/utils")

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

module.exports = router;