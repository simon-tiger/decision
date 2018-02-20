// Library
const decision = {
	// Function for creating a decision tree
	createDecisionTree: () => {
		// Return a tree object
		const tree = {
			// Properties
			input: null,
			questions: {},
			questionsArray: [],

			// Functions

			// Function to add a question
			addQuestion: (name, condition, callback1, callback2) => {
				tree.questions[name] = {condition, callback1, callback2};
				tree.questionsArray.push({name, condition, callback1, callback2});
			},

			// Function to execute a question
			goto(name) {
				if (typeof name === 'string') {
					const question = tree.questions[name];
					
					if (question.condition(tree, tree.input)) {
						question.callback1(tree);
					} else if (question.callback2) {
						question.callback2(tree);
					}
				} else if (typeof name === 'number') {
					const question = tree.questionsArray[name];
					
					if (question.condition(tree, tree.input)) {
						question.callback1(tree);
					} else if (question.callback2) {
						question.callback2(tree);
					}
				}
			},

			// Function to feed and run the decision tree!
			exec(input) {
				tree.input = input;
				tree.goto(0);
			}
		}

		return tree;
	}
}

if (typeof module !== 'undefined') {
	module.exports = decision;
}