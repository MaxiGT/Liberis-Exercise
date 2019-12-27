import moment from "moment";
import _ from 'lodash';

const assembleBaseTransactionHistory = (length) => {
	let baseHistory = [];

	for (let i = 1; i < length + 1; i++) {
		const month = moment().subtract(i, 'month').format('MMM-YY');
		baseHistory.push({ name: month, transactions: 0, amount: 0 });
	};

	return baseHistory;
}

const parseAndFillTransactionsHistory = (transactions, length) => {
	// Put together the base array with the last X months from today.
	let result = assembleBaseTransactionHistory(length);
	// Cicle through the transactions history and update/load the array with data.
	transactions.map((t) => {
		const month = moment(t.date.substring(0, t.date.indexOf('T'))).format('MMM-YY');
		// Combination found --> update
		result = result.map((r) => {
			if (r.name !== month) return r;
			return { name: r.name, transactions: r.transactions+1, amount: parseInt(r.amount) + parseInt(t.value) };
		});
	});

	return result;
}

const checkRegularTransactionHistory = (amount, history) => {
	// Recover the total sum of transactions without filling the 'empty' months
	const totalSumOfTransactions = _.sumBy(history, 'amount');
	const nonEmptyMonths = _.filter(history, (o) => { return o.transactions > 0 });

	// Load the 'empty' months amounts with the avh of all the other non empty months
	history = history.map((r) => {
		if (r.transactions > 0) return r;
		return { name: r.name, transactions: r.transactions+1, amount: totalSumOfTransactions/nonEmptyMonths.length };
	});

	// Verify that each month, the avg of transactions is higher than the requestedAmount
	const transactionMonthlyAvgCheck = history.reduce((acum, prev, i) => {
		if (i === 1) return ((acum.amount/acum.transactions > amount) && (prev.amount/prev.transactions > amount));
		return acum && (prev.amount/prev.transactions > amount);
	});

	// each month, the transaction avg must be higher than the amountRequested (transactionMonthlyAvgCheck)
	// and, for those months that had no transactions, are equal to 1 transaction and the value of
	// the avg of the rest of the months, hence, totalSumOfTransactions/amount of months (history.length) must also be higher
	return transactionMonthlyAvgCheck;
}

const checkAboveAverageTransactionHistory = (amount, history) => {
	// If any month of the last x months used has no transactions, then, not eligible
	if (_.findIndex(history, ['transactions', 0]) > -1) return false;
	// Past the previous condition, all months on the array will have transactions
	// We can then simply check the transactions avg of each month
	const transactionMonthlyAvgCheck = history.reduce((acum, prev, i) => {
		if (i === 1) return ((acum.amount/acum.transactions > amount) && (prev.amount/prev.transactions > amount));
		return acum && (prev.amount/prev.transactions > amount);
	});

	return transactionMonthlyAvgCheck;
}

export const checkEligibility = (file) => {
	// Assuming we have the filePath instead of the file itself
	// and have then to recover the file itself.

	// const req = new XMLHttpRequest();
	// req.open("GET", "file", false);
	// req.send();
	// file = JSON.parse(req.responseText);

	// Otherwise, simply receiving the file as an object ...

	let validTransactionHistory = false;
	const validMoneyRange = file.default.amountRequested >= 5000 && file.default.amountRequested <= 50000;
	const validTimeInBusiness = file.default.timeInBusiness.years > 0 || file.default.timeInBusiness.months > 12;

	if (file.default.amountRequested > 25000) {
		validTransactionHistory = checkAboveAverageTransactionHistory(file.default.amountRequested, parseAndFillTransactionsHistory(file.default.transactions, 13));
	} else {
		validTransactionHistory = checkRegularTransactionHistory(file.default.amountRequested, parseAndFillTransactionsHistory(file.default.transactions, 12));
	}

	return validMoneyRange && validTimeInBusiness && validTransactionHistory;
};
