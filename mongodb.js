// CRUD
// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID=mongodb.ObjectID
const { MongoClient, ObjectID } = require('mongodb');
// Connection URL
const connectionUrl = 'mongodb://127.0.0.1:27017';

// Database Name
const databaseName = 'task-manager-api';
// const id = new ObjectID();
// console.log(id.getTimestamp());

MongoClient.connect(
	connectionUrl,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(error, client) => {
		if (error) {
			return console.log('Unable to connect to database');
		}
		const db = client.db(databaseName);
		db.collection('tasks')
			.updateOne(
				{
					_id: new ObjectID('5eb20da344da08239c6f90e1'),
				},
				{
					$set: {
						description: 'Go Jogging',
					},
				}
			)
			.then((result) => {
				console.log(result);
			})
			.catch((e) => {
				console.log(e);
			});
	}
);
// collection
// db.collection('users').insertOne(
// 	{

// 		name: 'Vikram',
// 		age: 26,
// 	},
// 	(error, result) => {
// 		if (error) {
// 			return console.log('Unable to insert user');
// 		}
// 		console.log(result.ops);
// 	}
// );
// db.collection('users').insertMany(
// 	[
// 		{ name: 'Jen', age: 29 },
// 		{ name: 'Gunter', age: 27 },
// 	],
// 	(error, result) => {
// 		if (error) {
// 			return console.log('Unable to inserts docs');
// 		}
// 		console.log(result.ops);
// 	}
// );
// insert many
// db.collection('tasks').insertMany(
// 	[
// 		{ description: 'Read up on js promises', completed: false },
// 		{ description: 'Work on node.js course', completed: true },
// 		{ description: 'Walk the dog', completed: false },
// 	],
// 	(error, result) => {
// 		if (error) {
// 			return console.log('Unable to insert tasks');
// 		}
// 		console.log(result.ops);
// 	}
// );
// find
// db.collection('tasks').findOne(
// 	{ description: 'Work on node.js course' },
// 	(error, task) => {
// 		if (error) {
// 			return console.log('Unable to fetch');
// 		}
// 		console.log(task);
// 	}
// );
// db.collection('tasks')
// 	.find({ completed: true })
// 	.toArray((error, tasks) => {
// 		console.log(tasks);
// 	});
