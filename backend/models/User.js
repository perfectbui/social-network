const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UserSchema = new schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	userName: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
		default:
			'http://res.cloudinary.com/kh1em/image/upload/c_fill,h_55,w_55/v1602734766/uo0olap16ototuucubrg.png',
	},
	age: Number,
	address: String,
	phone: String,
});

const User = mongoose.model('User', UserSchema);
module.exports = User;