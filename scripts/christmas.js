const calculateGiftsOnDay = function (day)
{
	let numberOfGiftsOnThisDay = 0;
	if (day === 1)
	{
		numberOfGiftsOnThisDay = 1;
	}
	else
	{
		numberOfGiftsOnThisDay = day + calculateGiftsOnDay(day - 1);
	}
	return numberOfGiftsOnThisDay;
};

const calculateGiftSchedule = function ()
{
	const daysOfChristmas = Array.from(new Array(12), function (element, index)
	{
		const dayNumber = index + 1;
		const day =
		{
			"day": dayNumber,
			"gifts": calculateGiftsOnDay(dayNumber)
		};
		return day;
	});

	return daysOfChristmas;
};

const calculateTotalNumberOfGifts = function (schedule)
{
	const giftSchedule = schedule ?? calculateGiftSchedule();

	const totalNumberOfGifts = giftSchedule.reduce(function (accumulatedValue, element, index, array)
	{
		return accumulatedValue + element.gifts;
	}, 0);

	return totalNumberOfGifts;
};

export { calculateGiftsOnDay, calculateGiftSchedule, calculateTotalNumberOfGifts }

