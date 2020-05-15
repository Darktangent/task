const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const Task = require('./task');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
			trim: true,
			lowercase: true,
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error('Email is invalid');
				}
			},
		},
		password: {
			type: String,
			required: true,
			minlength: 7,
			trim: true,
			validate(value) {
				if (value.toLowerCase().includes('password')) {
					throw new Error('Password cannot contain "password"');
				}
			},
		},
		age: {
			type: Number,
			default: 0,
			validate(value) {
				if (value < 0) {
					throw new Error('Age must be a postive number');
				}
			},
		},
		tokens: [
			{
				token: {
					type: String,
					required: true,
				},
			},
		],
		avatar: { type: Buffer },
	},
	{ timestamps: true }
);
userSchema.virtual('tasks', {
	ref: 'Task',
	localField: '_id',
	foreignField: 'owner',
});
userSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();
	delete userObject.password;
	delete userObject.tokens;
	delete userObject.avatar;
	return userObject;
};
userSchema.methods.getPublicProfile = function () {
	const user = this;
	const userObject = user.toObject();
	delete userObject.password;
	delete userObject.tokens;
	return userObject;
};
userSchema.methods.generateAuthToken = async function () {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
	user.tokens = user.tokens.concat({ token: token });
	await user.save();
	return token;
};
// check user and pass
userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });
	if (!user) {
		throw new Error('Unable to login');
	}
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw new Error('Unable to login');
	}
	return user;
};
// hash pass
userSchema.pre('save', async function (next) {
	const user = this;
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}

	next();
});
// delete user tasks when user removed
userSchema.pre('remove', async function (next) {
	const user = this;
	await Task.deleteMany({ owner: user._id });
	next();
});

const User = mongoose.model('User', userSchema);
// const me = new User({
// 	name: 'Robin',
// 	age: 18,
// 	email: 'robin@example.com',
// 	password: 'worldjj123',
// });
// me.save()
// 	.then((me) => {
// 		console.log(me);
// 	})
// 	.catch((e) => {
// 		console.log(`Error: ${e.message}`);
// 	});
module.exports = User;

// const newTask = new Task({
// 	description: 'Work on the nodejs course',
// 	completed: false,
// });
// newTask
// 	.save()
// 	.then((task) => {
// 		console.log(task);
// 	})
// 	.catch((e) => {
// 		console.log(`Error: ${e.message}`);
// 	});
