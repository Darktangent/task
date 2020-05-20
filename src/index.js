const app = require('./app');
// const express = require('express');
// require('./db/mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const Task = require('./models/task');
// const User = require('./models/user');

// const userRouter = require('../src/routers/user');
// const taskRouter = require('../src/routers/task');
// const app = express();
// const router= new express.Router()
const port = process.env.PORT;

// express middleware
// app.use((req, res, next) => {
// 	console.log(req.method, req.path);

// 	next();
// });
// const multer = require('multer');
// const upload = multer({
// 	dest: 'images',
// 	limits: {
// 		fileSize: 1000000,
// 	},
// 	fileFilter(req, file, cb) {
// 		// cb(new Error("file must be a PDF"))
// 		// cb(undefined,true)
// 		if (!file.originalname.match(/\.(doc|docx)$/)) {
// 			return cb(new Error('Please upload a word document'));
// 		}
// 		cb(undefined, true);
// 	},
// });
// // const errorMiddleware = (req, res, next) => {
// // 	throw new Error('From my middleware');
// // };
// app.post(
// 	'/upload',
// 	upload.single('upload'),
// 	(req, res) => {
// 		res.send();
// 	},
// 	(error, req, res, next) => {
// 		res.status(400).send({ error: error.message });
// 	}
// );

// app.use(express.json());
// app.use(userRouter);
// app.use(taskRouter);

app.listen(port, () => {
	console.log(`Server running on ${port}`);
});
// const myfunc = async () => {
// 	const token = jwt.sign({ _id: 'abc123' }, 'nyismyfavstate', {
// 		expiresIn: '2 weeks',
// 	});
// 	console.log(token);

// 	const data = jwt.verify(token, 'nyismyfavstate');
// 	console.log(data);
// };
// const myfunc = async () => {
// 	const password = 'red1234!';
// 	const hashedPass = await bcrypt.hash(password, 8);
// 	console.log(hashedPass, password);
// 	const isMatch = await bcrypt.compare('red1234!', hashedPass);
// 	console.log(isMatch);
// };
// myfunc();
// const main = async () => {
// 	// const task = await Task.findById('5eb852f088ec2f48142e85eb');
// 	// await task.populate('owner').execPopulate();
// 	// console.log(task.owner);
// 	const user = await User.findById('5eb825f67f96af45001e9b85');
// 	await user.populate('tasks').execPopulate();
// 	console.log(user.tasks);
// };
// main();
