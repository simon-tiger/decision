const decision = require('./decision');

test('simple one-question decision tree', () => {
	const tree = decision.createDecisionTree();
	let message;

	tree.addQuestion('is a number < 7', (tree, x) => x < 7, tree => {
		message = 'yes, the number is < 7';
	}, tree => {
		message = 'no, the number is >= 7';
	});

	tree.exec(5);
	expect(message).toBe('yes, the number is < 7');

	tree.exec(12);
	expect(message).toBe('no, the number is >= 7');
});

test('more complicated decision tree', () => {
	const tree = decision.createDecisionTree();
	let message;

	tree.addQuestion('is it snowing', (tree, info) => info.snowing, tree => {
		tree.goto('is it hailing');
	}, tree => {
		tree.goto('is it sunny');
	});

	tree.addQuestion('is it hailing', (tree, info) => info.hailing, tree => {
		message = 'yes, it\'s raining';
	}, tree => {
		message = 'no, it\'s not raining';
	});

	tree.addQuestion('is it sunny', (tree, info) => info.sunny, tree => {
		message = 'no, it\'s not raining';
	}, tree => {
		tree.goto('is it windy');
	});

	tree.addQuestion('is it windy', (tree, info) => info.windy, tree => {
		message = 'no, it\'s not raining';
	}, tree => {
		message = 'yes, it\'s raining';
	});

	tree.exec({
		snowing: false,
		hailing: false,
		sunny: true,
		windy: false
	});

	expect(message).toBe('no, it\'s not raining');

	tree.exec({
		snowing: true,
		hailing: true,
		sunny: false,
		windy: false
	});

	expect(message).toBe('yes, it\'s raining');
});

// Test removed for now
// Maybe fix and uncomment back

// test('even more complicated decision tree', () => {
// 	const tree = decision.createDecisionTree();
// 	let message;

// 	tree.addQuestion('is it snowing', (tree, info) => info.snowing && info.temperature < 0, tree => {
// 		tree.goto('is it hailing');
// 	}, tree => {
// 		tree.goto('is it sunny');
// 	});

// 	tree.addQuestion('is it hailing', (tree, info) => info.hailing, tree => {
// 		message = 'yes, it\'s raining';
// 	}, tree => {
// 		message = 'no, it\'s not raining';
// 	});

// 	tree.addQuestion('is it sunny', (tree, info) => info.sunny, tree => {
// 		if (info.temperature > 0) {
// 			message = 'no, it\'s not raining';
// 		} else {
// 			message = 'you\'re lying!';
// 		}
// 	}, tree => {
// 		tree.goto('is it windy');
// 	});

// 	tree.addQuestion('is it windy', (tree, info) => info.windy, tree => {
// 		message = 'no, it\'s not raining';
// 	}, tree => {
// 		message = 'yes, it\'s raining';
// 	});

// 	tree.exec({
// 		snowing: true,
// 		temperature: -3,
// 		hailing: false,
// 		sunny: false,
// 		windy: false
// 	});

// 	expect(message).toBe('no, it\'s not raining');

// 	tree.exec({
// 		snowing: true,
// 		temperature: 2,
// 		hailing: true,
// 		sunny: false,
// 		windy: false
// 	});

// 	expect(message).toBe('yes, it\'s raining');

// 	tree.exec({
// 		snowing: false,
// 		temperature: -2,
// 		hailing: false,
// 		sunny: true,
// 		windy: false
// 	});

// 	expect(message).toBe('you\'re lying!');
// });