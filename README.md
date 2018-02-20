# Decision

Decision is a library for making decision trees.

## What are decision trees?

Decision trees are simply a tree of questions.

![Example Decision Tree](http://3.bp.blogspot.com/-d4XcAwYqmXI/UvoIeSCL2AI/AAAAAAAAEow/kzVWaHgg-bo/s1600/dectree_fruit.png)

## How to code using this library?

OK, firstup, we need to create a decision tree, like this:

```javascript
const tree = decision.createDecisionTree();
let message; // We need to store the output ourselves
```

Next, we can add a question using the `addQuestion()` function. 
`addQuestion()` takes 4 arguments:

* `name` (String): the keyword with which we access the question
* `condition` (Function)
  * `tree`: the decision tree itself
  * `input`: what we're feeding into the decision tree
  * Returns true if you want to answer the question as yes, and false otherwise
* `callback1` (Function): What the library executes when the answer is yes
  * `tree`: the decision tree itself
* `callback2` (Function) (optional): What the library executes when the answer is no
  * `tree`: the decision tree itself

We can also use the function `goto()`, which just takes a single argument:

* `name` (String): The question we want to go to

Now, we can write our code like this:

```javascript
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
```

Great! Now that we have our decision tree, we can actually use it, using the `exec()` function. `exec()`, like `goto()`, just takes a single argument:

* `input`: What we want to feed into the decision tree

This makes the final code the following:

```javascript
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

console.log(message);
```

When we run our code, we should see this in the console:

```
no, it's not raining
```

And if we tweak the `exec()` part a little bit:

```javascript
tree.exec({
	snowing: true,
	hailing: true,
	sunny: false,
	windy: false
});
```

And if we run our code again, we should see this:

```
yes, it's raining
```
