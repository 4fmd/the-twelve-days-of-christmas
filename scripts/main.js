import { calculateGiftsOnDay, calculateGiftSchedule, calculateTotalNumberOfGifts } from "./christmas.js";

/**
 *
 */
const schedule = calculateGiftSchedule();

/**
 *
 */
const totalNumberOfGifts = calculateTotalNumberOfGifts(schedule);

/**
 *
 * @returns
 */
const buildHeader = function ()
{
	const header = document.createElement("h1").appendChild(document.createTextNode(`The Twelve Days of Christmas`));
	return header;
};

const buildTableRow = function ()
{
	const tr = document.createElement("tr");
	const args = Array.from(arguments);
	args.forEach(function (element, index, array)
	{
		const td = document.createElement("td");
		td.appendChild(element);

		tr.appendChild(td);
	});
	return tr;
}

/**
 *
 * @returns
 */
const buildBody = function ()
{
	const thead = document.createElement("tbody");
	thead.appendChild(buildTableRow(document.createTextNode("Day"), document.createTextNode("Gifts")));

	const tbody = document.createElement("tbody");

	schedule.forEach(function (element, index, array)
	{
		tbody.appendChild(buildTableRow(document.createTextNode(element.dayNumber), document.createTextNode(element.numberOfGifts)));
	});

	tbody.appendChild(buildTableRow(document.createTextNode("Total"), document.createTextNode(totalNumberOfGifts)));

	const table = document.createElement("table");
	table.appendChild(thead);
	table.appendChild(tbody);

	const div = document.createElement("div");
	div.appendChild(table);

	return div;
};

const root = document.getElementById("root");
root.appendChild(buildHeader());
root.appendChild(buildBody());
