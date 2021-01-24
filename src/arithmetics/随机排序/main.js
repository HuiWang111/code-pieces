// random Ranking
function ranSort(arr, result = []) {
	let len = arr.length;

	if (len === 1) {
		result.push(arr[0]);
		return result;
	}

	let ran = Math.floor(Math.random() * len);  /*select one Element by random */
	result.push(arr[ran]);
	arr.splice(ran, 1);
	
	return ranSort(arr, result);
}

window.onload = function () {
	let arr = [1, 2, 3, 4, 5, 6, 7];
	let res = ranSort(arr);

	console.log(res);
}