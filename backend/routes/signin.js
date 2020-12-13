const express = require('express');
const router = express.Router();
const { isValidPassword, issueJwt } = require('../libs/utils');
const validate = require('../middlewares/validate');
const User = require('../models/User');

router.post('/', validate.login, async (req, res) => {
	try {
		const { email, password } = req.body;

		let responseToClient = {};
		const existUser = await User.findOne({
			email,
		});

		if (existUser === null) {
			responseToClient = {
				message: 'Sai mật khẩu hoặc tài khoản không tồn tại',
			};
			res.status(401).json(responseToClient);
		} else {
			if (!existUser.password) {
				responseToClient = {
					message: 'Sai mật khẩu hoặc tài khoản không tồn tại',
				};
				res.status(401).json(responseToClient);
			} else {
				let isValid = await isValidPassword(
					password,
					existUser.password
				);
				if (isValid) {
					issueJwt(existUser, res);
					res.status(200).json({
						message: 'Đăng nhập thành công',
					});
				} else {
					responseToClient = {
						message: 'Sai mật khẩu hoặc tài khoản không tồn tại',
					};
					res.status(401).json(responseToClient);
				}
			}
		}
	} catch (err) {
		res.status(401).json({
			message: err,
		});
	}
});

module.exports = router;