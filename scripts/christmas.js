/**
 * Calculates the total number of gifts given on the provided day.  The total
 * number of gifts given on each day is equal to the sum of the new gifts
 * given on that day and the sum of the gifts given on previous days.  E.g.,
 *
 * On the fourth day of Christmas my true love gave to me ...
 * - Four Calling Birds
 * - Three French Hens
 * - Two Turtle Doves
 * - Partridge in a Pear Tree
 *
 * The "Four Calling Birds" are the new gifts for the day, while the "Three
 * French Hens", "Two Turtle Doves", and "Partridge in a Pear Tree" are the
 * gifts from the previous days.  So, the total number of gifts given on the
 * fourth day would be: `4 + 3 + 2 + 1 = 10`
 *
 * @param {Number} day The Day of Christmas to perform the gift calculation,
 * I.e., `1, 2, ..., 12`
 *
 * @returns {Number} The total number of gifts given on the specified day of
 * Christmas
 *
 * @throws {Error} This function does not handle its errors, instead it throws
 * them requiring the caller to handle any errors.
 *
 */
const calculateTotalNumberOfGiftsOnDay = function (day)
{
	let numberOfGiftsOnThisDay = 0;
	let dayNumber = 0;

	//  Cannot calculate the total number of gifts for this day, if there is no day
	if (typeof day === "undefined" || day == null)
	{
		throw new Error("Day number (I.e., which Day of Christmas) must be provided!");
	}

	//  Day needs to be a number, otherwise the day value cannot be decremented
	if (typeof day !== "number")
	{
		throw new Error(`Unexpected day number type!  Expected:  'number', Actual: '${ typeof day }'`)
	}

	//  Day number has to be one at a minimum, negative days aren't supported
	if (day <= 0)
	{
		throw new Error(`Invalid day number (I.e., Day of Christmas) value: ${ day }`);
	}

	//  JavaScript has only one number type that encompasses both integers and floats.
	//  Drop any decimal places as the algorithm only handles integers
	dayNumber = parseInt(day);

	if (dayNumber === 1)
	{
		//  Base case for the algorithm's recursive logic.  The gifts all
		//  start with a "Partridge in a Pear Tree" that my true love gave to
		//  me on the first day of Christmas.
		numberOfGiftsOnThisDay = 1;
	}
	else
	{
		//  Recursive case for the algorithm's logic.  Each day builds upon
		//  the gifts from the previous day.  E.g., "Three French Hens", "Two
		//  Turtle Doves", and a "Partridge in a Pear Tree" on day three.  So,
		//  Day three yields six total gifts:  3 + 2 + 1
		numberOfGiftsOnThisDay = dayNumber + calculateTotalNumberOfGiftsOnDay(dayNumber - 1);
	}
	return numberOfGiftsOnThisDay;
};

/**
 * Calculates the total number of gifts given on each Day of Christmas.  The
 * results are returned as an array of objects.
 *
 * Each object contains two properties `dayNumber` and `numberOfGifts`.  The
 * `dayNumber` property is an integer describing the number of the day of
 * Christmas.  The number is one-based index of the day in the list.  The
 * `numberOfGifts` is an integer describing the total number of gifts given on
 * that day.
 *
 * @returns {Object[]} Array of objects describing the total number of gifts
 * given on a particular day.
 *
 */
const calculateGiftSchedule = function ()
{
	//  Use the Array.from method to fill an array with the result of a
	//  callback function that will be called for each item in the array.
	const daysOfChristmasGiftSchedule = Array.from(new Array(12), function (element, index)
	{
		//  JavaScript arrays are zero based, but the song is one based.  So,
		//  calculate the day number as one more than the index
		const dayNumber = index + 1;

		//  Wrap the day number and the number of gifts given in an object
		const day =
		{
			"dayNumber": dayNumber,
			"numberOfGifts": calculateTotalNumberOfGiftsOnDay(dayNumber)
		};

		return day;
	});

	return daysOfChristmasGiftSchedule;
};

/**
 * Uses a gift schedule to calculate the total number of gifts given over all
 * the Days of Christmas.
 *
 * Optionally, the schedule of gifts can be provided.  The schedule is an
 * array of objects each containing two properties:  `dayNumber` and
 * `numberOfGifts`.  The `dayNumber` property is an integer describing the
 * number of the day of Christmas.  The number is one-based index of the day
 * in the list.  The `numberOfGifts` is an integer describing the total number
 * of gifts given on that day.
 *
 * @param {Object[]|null} schedule Array of objects describing the total
 * number of gifts given on each specific Day of Christmas.  If the schedule
 * is not provided, it will be calculated.
 *
 * @returns {Number}  The total number of gifts given over all the days of
 * Christmas
 *
 */
const calculateTotalNumberOfGifts = function (schedule)
{
	//  If the gift schedule was not provided, calculate it
	const giftSchedule = schedule ?? calculateGiftSchedule();

	//  Use the reduce function to calculate the total number of gifts given over all the days
	const totalNumberOfGifts = giftSchedule.reduce(function (accumulatedValue, element, index, array)
	{
		return accumulatedValue + element.numberOfGifts;
	}, 0);

	return totalNumberOfGifts;
};

export { calculateGiftSchedule, calculateTotalNumberOfGifts }

