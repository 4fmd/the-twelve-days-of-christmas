# The Twelve Days of Christmas Recursive Illustration
This project provides an explanation of the recursive logic used to calculate the number of gifts given in "The Twelve Days of Christmas"

<details open>
	<summary>Table of Contents</summary>

- [The Twelve Days of Christmas Recursive Illustration](#the-twelve-days-of-christmas-recursive-illustration)
    - [Overview](#overview)
    - [Development](#development)
      - [Web Server](#web-server)
    - [Recursive Algorithm](#recursive-algorithm)
      - [Recursion vs Iteration](#recursion-vs-iteration)
    - [Algorithm Explanation](#algorithm-explanation)
      - [Example Walkthrough](#example-walkthrough)

</details>

### Overview
This project uses [JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) for its logic.  JavaScript modules cannot be executed locally, E.g., with a `file://` URL, so the project will need to be deployed to a web server.  No server specific logic or dependencies were used in this project, therefore any web server should suffice.

### Development
The project was developed using [Visual Studio Code](https://code.visualstudio.com/) on [Ubuntu 22.04.3 LTS](https://releases.ubuntu.com/22.04.3/).

#### Web Server
For development the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) Visual Studio Code extension was used.

### Recursive Algorithm
The calculation of how many gifts are given in total for each day builds upon the total number of gifts given on the previous day.  This allows for the calculation to be naturally recursive.

#### Recursion vs Iteration
There exist proofs that show iterative problems can be solved with recursion and that recursive problems can be solved using iteration.  Such proofs are beyond the scope of this project.  Multiple resources exist to provide and explain the proofs.  Consider [this](http://infolab.stanford.edu/~ullman/focs/ch02.pdf) text provided by [Stanford Infolab](http://infolab.stanford.edu/).

Development plans for the future of this project include iterative solutions.  But the potential iterative solutions will not be derived mathematically.

### Algorithm Explanation
The recursive algorithm is contained in [`christmas.js`](./scripts/christmas.js).  A slimmed down version has been provided below.

```javascript
const calculateTotalNumberOfGiftsOnDay = function (day)
{
	let numberOfGiftsOnThisDay = 0;

	if (day === 1)
	{
		numberOfGiftsOnThisDay = 1;
	}
	else
	{
		numberOfGiftsOnThisDay = day + calculateTotalNumberOfGiftsOnDay(day - 1);
	}
	return numberOfGiftsOnThisDay;
};
```

The first thing the algorithm does is check the [base case](https://www.geeksforgeeks.org/what-is-base-case-in-recursion/).  When the base case is `true`, the recursion is finished.  Otherwise, the recursion needs to continue.

In the case of <i>The Twelve Days of Christmas</i>, the base case is the partridge in the pear tree.  The partridge is given on every day of Christmas.  Meaning it will be the first gift given, and since each day's gifts are built upon the previous days' gifts it will be the last gift given each day.  Since, it is the last gift given on each day, once the algorithm reaches the partridge the day's calculation is finished.

This base case behavior is contained in the following section of code from the sample above:

```javascript
if (day === 1)
{
	numberOfGiftsOnThisDay = 1;
}
//...
return numberOfGiftsOnThisDay;
```

If the day provided to the algorithm is the first day, the partridge will be given, the value `1` can be returned as each day's gifts will end with the single partridge.

When the base case is not `true`, the algorithm needs to continue.  For <i>The Twelve Days of Christmas</i>, the algorithm adds the number of new gifts given on this day to the total of all the gifts from the previous days'.  The number of new gifts given is always equal to the Day of Christmas' day number.  I.e., the seventh day gives seven swans a swimmin'.  These swans are the new gifts.  Then, the gifts from the previous days':  the six geese a layin', the five golden rings, the four calling birds, the three French hens, the two turtle doves, and finally the partridge are given.

This pattern means that to calculate the number of gifts on any day, the day's number is added to the number of gifts from the previous day.  The previous day's total number of gifts is then calculated by adding its number to the total number of gifts from its previous day.  This continues until the first day is encountered which yields the single partridge.

This process of starting over the the algorithm's recursive steps.  Recursive steps are made until the base case is triggered.  Once the base case is triggered the last recursive step is finished.  Once the last recursive step is finished the preceding one can finish, then the one that preceded it, and so on until the first call finishes and the final result can be returned.

This recursive step behavior is contained in the following section of code from the sample above:

```javascript
//...
else
{
	numberOfGiftsOnThisDay = day + calculateTotalNumberOfGiftsOnDay(day - 1);
}
return numberOfGiftsOnThisDay;
```

#### Example Walkthrough
Consider the French hens given on day three as an example of how the recursion works.

1. The `calculateTotalNumberOfGiftsOnDay` method is called with a `day` value of `3`.

2. The base case, `if (day === 1)`, is executed and evaluates to `false`.

3. The `numberOfGiftsOnThisDay` is to be set, but a recursive call to `calculateTotalNumberOfGiftsOnDay` must be performed.  The `day - 1` calculation will have the highest precedence, and will provide the recursive call the input of `2`.

4. The `calculateTotalNumberOfGiftsOnDay` function is restarted, and again checks the base case.

5. Again, the base case evaluates to `false` meaning another recursive step is needed.

6. The `calculateTotalNumberOfGiftsOnDay` is restarted for a second time with an input of `1`.

7. The base case is once again checked, and this time evaluates to `true`.

8. The `true` evaluation means that the second call to `calculateTotalNumberOfGiftsOnDay` can return a value of `1`.

9. The first recursive call to `calculateTotalNumberOfGiftsOnDay` continues execution andcan now perform its assignment of `numberOfGiftsOnThisDay`.  It adds its input day number (`2`) to the result returned from the second recursive call (`1`) and can the return its value of `3`.

10. The original call to `calculateTotalNumberOfGiftsOnDay` can now resume its execution.  It received a value of `3` from the first recursive call, and can add that value to its day value (`3`) and return a result of `6`.







