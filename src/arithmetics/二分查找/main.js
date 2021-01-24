Array.prototype.binarySearch = function (target, start = 0, end = this.length - 1) {
	let mid = Math.floor((start + end)/2);
	if (target === this[mid]) {
		return mid;
	} else if (target < this[mid]) {
		return this.binarySearch(target, start, mid - 1);
	} else {
		return this.binarySearch(target, mid + 1, end);
	}
}


window.onload = function () {
	
}

