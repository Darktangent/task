// const mongoose=require("mongoose")
require('../src/db/mongoose');
const User = require('../src/models/user');
const Task = require('../src/models/task');

// const updateAgeAndCount = async (id, age) => {
// 	const user = await User.findByIdAndUpdate(id, { age });
// 	const count = await User.countDocuments({ age });
// 	return { count, user };
// };
// updateAgeAndCount('5eb3529c5a400c0b60572b65', 20)
// 	.then((data) => {
// 		console.log(data.count);
// 		console.log(data.user);
// 	})
// 	.catch((e) => {
// 		console.log(e);
// 	});
// User.findByIdAndUpdate('5eb3529c5a400c0b60572b65', { age: 19 })
// 	.then((user) => {
// 		console.log(user);
// 		return User.countDocuments({ age: 19 });
// 	})
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((e) => {
// 		console.log(e);
// 	});
// Task.findByIdAndDelete('5eb3529c5a400c0b60572b64')
// 	.then((task) => {
// 		console.log(task);
// 		return Task.countDocuments({ completed: false });
// 	})
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((e) => {
// 		console.log(e);
// 	});
const deleteTaskAndCount = async (id) => {
	await Task.findByIdAndDelete(id);
	const incomplete = await Task.countDocuments({ completed: false });
	const incompletedTasks = await Task.find({ completed: false });
	return { incomplete, incompletedTasks };
};
deleteTaskAndCount('5eb338bc26ae0427ecd1196b')
	.then((data) => {
		console.log(data.incomplete);
		console.log(data.incompletedTasks);
	})
	.catch((e) => {
		console.log(e);
	});
