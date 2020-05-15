const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// sgMail.send({
// 	to: 'c1ph3r9@gmail.com',
// 	from: 'c1ph3r9@gmail.com',
// 	subject: 'Test Email',
// 	text: 'Sending using sendgrid',
// });
const sendWelcomeEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: 'c1ph3r9@gmail.com',
		subject: `Thanks for joining, ${name}`,
		text: `Welcome to the App, ${name}. Let me know how you like the App`,
	});
};
const sendCancelEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: 'c1ph3r9@gmail.com',
		subject: `Sad to see you go, ${name}`,
		text: `Hey, ${name}. We are very sad to see you go. Please let us know if we could've done anything better to keep you as our valued customer`,
	});
};
module.exports = { sendWelcomeEmail, sendCancelEmail };
