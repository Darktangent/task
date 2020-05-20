const {
	calculateTip,
	fahrenheitToCelsius,
	celsiusToFahrenheit,
	add,
} = require('../src/math');

test('Should calculate total with tip', () => {
	const total = calculateTip(10, 0.3);
	expect(total).toBe(13);
});
// test('Should convert fahrenheit to celcius', () => {
// 	const result = fahrenheitToCelsius(32);
// 	expect(result).toBe(0);
// });
// test('Should convert celcius to fahrenheit', () => {
// 	const result = celsiusToFahrenheit(0);
// 	expect(result).toBe(32);
// });

// test('Async test demo', (done) => {
// 	setTimeout(() => {
// 		expect(1).toBe(1);
// 		done();
// 	}, 2000);
// });
// test('should add two numbers', (done) => {
// 	add(10, 2).then((sum) => {
// 		expect(sum).toBe(12);
// 		done();
// 	});
// });
// test('Add 2 num async', async () => {
// 	const result = await add(10, 2);
// 	expect(result).toBe(12);
// });
