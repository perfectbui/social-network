const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const validate = require('../middlewares/validate');

router.post(
	'/',
	validate.register,
	validate.checkEmailExist,
	async (req, res) => {
		try {
			let { userName, email, password, age, address, phone } = req.body;

			const hashPassword = await bcrypt.hash(password, saltRounds);

			const newUser = new User({
				userName,
				email,
				password: hashPassword,
				address,
				phone,
				age: parseInt(age, 10),
			});

			await newUser.save();

			res.status(200).json({
				message: 'Đăng ký thành công',
			});
		} catch (err) {
			res.status(400).json({
				message: err,
			});
		}
	}
);

module.exports = router;
