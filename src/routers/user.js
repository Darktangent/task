const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();
const upload = multer({
	// dest: 'avatar',
	limits: {
		fileSize: 1000000,
	},
	fileFilter(req, file, cb) {
		// cb(new Error("file must be a PDF"))
		// cb(undefined,true)
		if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
			return cb(new Error('Please upload a Image'));
		}
		cb(undefined, true);
	},
});
// create User
router.post('/users', async (req, res) => {
	const user = new User(req.body);
	try {
		const token = await user.generateAuthToken();
		await user.save();
		res.status(201).send({ user, token });
	} catch (e) {
		res.status(400).send(e.message);
	}
});
// Login
router.post('/users/login', async (req, res) => {
	try {
		const user = await User.findByCredentials(
			req.body.email,
			req.body.password
		);
		const token = await user.generateAuthToken();
		// res.send({ user, token });
		// res.send({ user: user.getPublicProfile(), token });
		res.send({ user, token });
		console.log(user);
	} catch (e) {
		res.status(400).send();
	}
});
// logout
router.post('/users/logout', auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter((token) => {
			console.log(req);

			return token.token !== req.token;
		});
		await req.user.save();
		res.send();
	} catch (e) {
		res.status(500).send();
	}
});
// logout all
router.post('/users/logoutAll', auth, async (req, res) => {
	try {
		console.log(req);
		req.user.tokens = [];
		await req.user.save();
		res.send();
	} catch (e) {
		res.send(500).send();
	}
});
router.get('/users/me', auth, async (req, res) => {
	// try {
	// 	const users = await User.find({});
	// 	res.send(users);
	// } catch (e) {
	// 	res.status(500).send(e.message);
	// }
	console.log(req);
	res.send(req.user);
});
router.get('/users/:id', auth, async (req, res) => {
	const _id = req.params.id;
	try {
		const user = await User.findById({ _id });
		if (!user) {
			res.status(404).send();
		}
		res.status(200).send(user);
	} catch (e) {
		res.status(404).send(e.message);
	}
});

// router.delete('/users/:id', auth, async (req, res) => {
// 	try {
// 		const user = await User.findByIdAndDelete(req.params.id);
// 		if (!user) {
// 			res.status(404).send();
// 		}
// 		res.send(user);
// 	} catch (e) {
// 		res.status(500).send();
// 	}
// });
router.delete('/users/me', auth, async (req, res) => {
	try {
		// const user = await User.findByIdAndDelete(req.user._id);
		// if (!user) {
		// 	res.status(404).send();
		// }
		await req.user.remove();

		res.send(req.user);
	} catch (e) {
		res.status(500).send();
	}
});
router.patch('/users/:id', auth, async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['name', 'email', 'age', 'password'];
	const isValidOperation = updates.every((update) => {
		return allowedUpdates.includes(update);
	});
	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates' });
	}
	const _id = req.params.id;
	try {
		const user = await User.findById(_id);
		updates.forEach((update) => (user[update] = req.body[update]));
		await user.save();
		if (!user) {
			return res.status(404).send();
		}
		res.send(user);
	} catch (e) {
		res.status(400).send(e);
	}
});
router.patch('/users/me', auth, async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['name', 'email', 'password', 'age'];
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates!' });
	}

	try {
		console.log(req.user);

		updates.forEach((update) => (req.user[update] = req.body[update]));
		await req.user.save();
		res.send(req.user);
	} catch (e) {
		res.status(400).send(e);
	}
});
router.post(
	'/users/me/avatar',
	auth,
	upload.single('avatar'),
	async (req, res) => {
		// req.user.avatar = req.file.buffer;
		const buffer = await sharp(req.file.buffer)
			.resize({ width: 250, height: 250 })
			.png()
			.toBuffer();
		req.user.avatar = buffer;
		await req.user.save();
		res.send();
		// render to binary in browser
		// <img src="data:img/jpg;base64,binarydata">
	},
	(error, req, res, next) => {
		res.status(400).send({ error: error.message });
	}
);
router.delete('/users/me/avatar', auth, async (req, res) => {
	req.user.avatar = undefined;
	await req.user.save();
	res.send();
});
router.get('/users/:id/avatar', async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user || !user.avatar) {
			throw new Error();
		}
		res.set('Content-Type', 'image/png');
		res.send(user.avatar);
	} catch (e) {
		res.status(404).send();
	}
});
module.exports = router;
// const user = await User.findByIdAndUpdate(_id, req.body, {
// 	new: true,
// 	runValidators: true,
// });
