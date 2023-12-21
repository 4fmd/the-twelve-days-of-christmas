import { calculateGiftSchedule, calculateTotalNumberOfGifts } from "./christmas.js";

/**
 * Array of objects describing the schedule of gifts given.  The objects each
 * contain two properties:  `dayNumber` and `numberOfGifts`.  The `dayNumber`
 * property is an integer describing the number of the day of Christmas.  The
 * number is one-based index of the day in the list.  The `numberOfGifts` is
 * an integer describing the total number of gifts given on that day.
 *
 */
const schedule = calculateGiftSchedule();

/**
 * Total number of gifts given throughout all the Days of Christmas
 */
const totalNumberOfGifts = calculateTotalNumberOfGifts(schedule);

/**
 * Builds the header section to be displayed on the main page.  The header
 * section contains a simple title message.
 *
 * @returns {HTMLElement} Header section to be displayed on the main page
 *
 */
const buildHeader = function ()
{
	const header = document.createElement("h1");
	header.appendChild(document.createTextNode("The Twelve Days of Christmas"));

	return header;
};

/**
 * Helper function to build a table row element to be used in the table
 * displaying the the number of gifts given on each Day of Christmas.
 *
 * @param {HTMLElement} arguments Any number of `HTMLElement` objects to be
 * contained in the resulting table row.  Each element will be wrapped in a
 * table cell element.
 *
 * @returns {HTMLTableRowElement} Table row containing the provided argument
 * elements wrapped in table cell elements
 *
 */
const buildTableRow = function ()
{
	//  The arguments property of a function is Array-like, not an actual
	//  Array.  So, use the from method to create an Array object
	const args = Array.from(arguments);

	const tr = document.createElement("tr");

	//  Wrap each provided argument in a table cell element, and append it to
	//  the table row being constructed
	args.forEach(function (element, index, array)
	{
		const td = document.createElement("td");
		td.appendChild(element);

		tr.appendChild(td);
	});
	return tr;
};

/**
 * Builds the body section to be displayed on the main page.  The body section
 * contains a table that lists the day number and the number of gifts received
 * on that day.
 *
 * @returns {HTMLElement} Body section to be displayed on the main page
 *
 */
const buildBody = function ()
{
	const thead = document.createElement("thead");
	thead.appendChild(buildTableRow(document.createTextNode("Day"), document.createTextNode("Gifts Received")));

	const tbody = document.createElement("tbody");

	//  For each day in the schedule, create a table row displaying the day
	//  number and the number of gifts received
	schedule.forEach(function (element, index, array)
	{
		tbody.appendChild(buildTableRow(document.createTextNode(element.dayNumber), document.createTextNode(element.numberOfGifts)));
	});

	tbody.appendChild(buildTableRow(document.createTextNode("Total:"), document.createTextNode(totalNumberOfGifts)));

	//  Build the main table
	const table = document.createElement("table");
	table.appendChild(thead);
	table.appendChild(tbody);

	//  Wrap the main table in a div
	const div = document.createElement("div");
	div.appendChild(table);

	return div;
};

const root = document.getElementById("root");
root.appendChild(buildHeader());
root.appendChild(buildBody());

