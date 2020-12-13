const jwt = require('jsonwebtoken');
const { isProtectedCSRF } = require('../libs/utils');

module.exports = {
	authenticate: async (req, res, next) => {
		if (!isProtectedCSRF(req)) {
			res.status(401).json({
				message: 'Authenticate failed : x-requested-with missing',
			});
		} else {
			// Lấy full JWT từ 2 cookie
			const fullJwt =
				req.cookies.headerAndPayload + '.' + req.cookies.signature;
			try {
				req.decoded = await jwt.verify(fullJwt, process.env.SECRET_KEY);
				next();
			} catch (error) {
				res.status(401).json({
					message: 'Authenticated failed',
				});
			}
		}
	},
	verify: (req, res, next) => {
		if (!req.decoded.isVerified) {
			res.json({
				isError: true,
				err: 'verifyFail',
			});
		} else {
			next();
		}
	},
};